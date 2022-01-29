import {Button, Modal, Stack} from "react-bootstrap";
import {NO_CAT_BUDGET_ID, useBudgets} from "../context/BudgetContext";
import {formatCurrency} from "../utils";

interface ViewExpenseModalProps {
  budgetIdToView: string | null
  onClose: () => void
}

export default ({budgetIdToView, onClose}: ViewExpenseModalProps) => {
  const {budgets, getExpenses, deleteBudget, deleteExpense} = useBudgets()
  const budget = budgets.find(it => it.id === budgetIdToView)
  const budgetId: string = budget?.id ?? NO_CAT_BUDGET_ID
  const expenses = getExpenses(budgetId)

  const onClickDeleteBudget = (budgetId: string) => {
    if (budgetId && budgetId !== NO_CAT_BUDGET_ID) {
      deleteBudget(budgetId)
    }
    onClose()
  }

  return (
    <Modal show={budgetIdToView != null} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {budget?.name}</div>
            {budgetId !== NO_CAT_BUDGET_ID &&
              <Button variant="outline-danger" onClick={() => onClickDeleteBudget(budgetId)}>Delete
              </Button>
            }
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map(it => (
            <Stack direction="horizontal" gap={2} key={it.id}>
              <div className="me-auto fs-4">{it.description}</div>
              <div className="fs-5">{formatCurrency(it.amount)}</div>
              <Button size="sm" variant="outline-danger" onClick={() => deleteExpense(it.id)}>&times;</Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
