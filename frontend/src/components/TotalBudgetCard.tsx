import BudgetCard from "./BudgetCard";
import {useBudgets} from "../context/BudgetContext";

export default () => {
  const {budgets, expenses} = useBudgets()
  const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const limit = budgets.reduce((sum, budget) => sum + budget.maxLimit, 0)

  if (!spent) {
    return null
  } else {
    return (
      <BudgetCard
        name={"Total"}
        spent={spent}
        limit={limit}
        onAddExpenseClick={() => {
        }}
        onViewExpensesClick={() => {
        }}
        lightBg={true}
        hideButtons={true}
      />
    )
  }
}
