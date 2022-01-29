import BudgetCard from "./BudgetCard";
import {NO_CAT_BUDGET_ID, useBudgets} from "../context/BudgetContext";

interface NoCatBudgetCardsProps {
  onAddExpenseClick: () => void
  onViewExpensesClick: () => void
}

export default ({onAddExpenseClick, onViewExpensesClick}: NoCatBudgetCardsProps) => {
  const {expenses} = useBudgets()
  const noCatExpenses = expenses.filter(it => it.budgetId === NO_CAT_BUDGET_ID)
  const amount = noCatExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  if (!amount) {
    return null
  } else {
    return (
      <BudgetCard
        name={"No Category"}
        spent={amount}
        limit={0}
        onAddExpenseClick={onAddExpenseClick}
        onViewExpensesClick={onViewExpensesClick}
        lightBg={true}
      />
    )
  }
}
