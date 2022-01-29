import React, {useContext} from "react";
import {v4 as uuid} from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage";

export const NO_CAT_BUDGET_ID = "no-cat"

interface IBudget {
  id: string
  name: string
  limit: number
}

interface IExpenses {
  id: string
  budgetId: string
  amount: number
  description: string
}

interface ContextType {
  budgets: IBudget[]
  expenses: IExpenses[]
  addBudget: (name: string, limit: number) => void
  deleteBudget: (budgetId: string) => void
  addExpense: (budgetId: string, description: string, amount: number) => void
  getExpenses: (budgetId: string) => IExpenses[]
  deleteExpense: (expenseId: string) => void
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
  const [budgets, setBudgets] = useLocalStorage<IBudget[]>("budgets", [])
  const [expenses, setExpenses] = useLocalStorage<IExpenses[]>("expenses", [])

  const addBudget = (name: string, limit: number) => {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(it => it.name === name)) {
        return prevBudgets
      }

      return [...prevBudgets, {id: uuid(), name, limit}]
    })
  }

  const deleteBudget = (budgetId: string) => {
    // move any expenses from the budget to the no category budget
    setExpenses(prevExpenses => {
      return prevExpenses.map(it => {
        if (it.budgetId !== budgetId) {
          return it
        } else {
          return {...it, budgetId: NO_CAT_BUDGET_ID}
        }
      })
    })

    setBudgets(prevBudgets => {
      return prevBudgets.filter(it => it.id !== budgetId)
    })
  }

  const addExpense = (budgetId: string, description: string, amount: number) => {
    setExpenses(prevExpenses => {
      return [...prevExpenses, {id: uuid(), budgetId, description, amount}]
    })
  }

  const getExpenses = (budgetId: string): IExpenses[] => {
    return expenses.filter(it => it.budgetId === budgetId)
  }

  const deleteExpense = (expenseId: string) => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(it => it.id !== expenseId)
    })
  }

  return (
    <BUDGET_CONTEXT.Provider value={{
      budgets,
      expenses,
      addBudget,
      deleteBudget,
      addExpense,
      getExpenses,
      deleteExpense
    }}>
      {children}
    </BUDGET_CONTEXT.Provider>
  )
}

export default BudgetProvider
