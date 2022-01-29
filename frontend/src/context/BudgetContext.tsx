import React, {useContext, useEffect, useState} from "react";

const axios = require('axios').default
axios.defaults.baseURL = "http://localhost:8080/api"

export const NO_CAT_BUDGET_ID = "no-cat"

export interface IBudget {
  id: string
  name: string
  maxLimit: number
  expenses: IExpense[]
}

export interface IExpense {
  id: string
  budgetId: string
  amount: number
  description: string
}

interface ContextType {
  budgets: IBudget[]
  expenses: IExpense[]
  addBudget: (name: string, limit: number) => void
  deleteBudget: (budget: IBudget) => void
  addExpense: (budgetId: string, description: string, amount: number) => void
  deleteExpense: (expenses: IExpense) => void
}

const BUDGET_CONTEXT = React.createContext<ContextType | null>(null)

export const useBudgets = (): ContextType => {
  const ctx = useContext(BUDGET_CONTEXT)
  if (!ctx) {
    throw Error("Component is not wrapped around a BudgetProvider!")
  }
  return ctx
}

const BudgetProvider: React.FC = ({children}) => {
  const [budgets, setBudgets] = useState<IBudget[]>([])
  const [expenses, setExpenses] = useState<IExpense[]>([])

  const addBudget = async (name: string, limit: number) => {
    if (budgets.find(it => it.name === name)) {
      return
    }

    try {
      await axios.post("/v1/budgets", {
        name: name,
        maxLimit: limit
      })
      await getBudgetsAndExpenses()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBudget = async (budget: IBudget) => {
    try {
      await axios.delete("/v1/budgets", {
        data: {
          id: budget.id,
          name: budget.name,
          maxLimit: budget.maxLimit
        }
      })
      await getBudgetsAndExpenses()
    } catch (error) {
      console.error(error)
    }
  }

  const addExpense = async (budgetId: string, description: string, amount: number) => {
    try {
      await axios.post("/v1/expenses", {
        budgetId: budgetId,
        description: description,
        amount: amount
      })
      await getBudgetsAndExpenses()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteExpense = async (expense: IExpense) => {
    try {
      await axios.delete("/v1/expenses", {
        data: {
          id: expense.id,
          budgetId: expense.budgetId,
          amount: expense.amount,
          description: expense.description
        }
      })
      await getBudgetsAndExpenses()
    } catch (error) {
      console.error(error)
    }
  }

  const getBudgetsAndExpenses = async () => {
    try {
      let response = await axios.get("/v1/expenses")
      const resExpenses: IExpense[] = response.data ?? []
      setExpenses(resExpenses)

      response = await axios.get("/v1/budgets")
      const resBudgets: IBudget[] = response.data ?? []
      resBudgets.forEach(budget => budget.expenses = resExpenses.filter(it => it.budgetId === budget.id))
      setBudgets(resBudgets)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    (async () => {
      await getBudgetsAndExpenses()
    })()
  }, [children])

  return (
    <BUDGET_CONTEXT.Provider value={{
      budgets,
      expenses,
      addBudget,
      deleteBudget,
      addExpense,
      deleteExpense
    }}>
      {children}
    </BUDGET_CONTEXT.Provider>
  )
}

export default BudgetProvider
