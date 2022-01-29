import {Button, Form, Modal} from "react-bootstrap";
import {FormEvent, useRef} from "react";
import {NO_CAT_BUDGET_ID, useBudgets} from "../context/BudgetContext";

interface AddExpenseModalProps {
  show: boolean
  defaultBudgetId: string
  onClose: () => void
}

export default ({show, defaultBudgetId, onClose}: AddExpenseModalProps) => {
  const descriptionRef = useRef<HTMLInputElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const forBudgetRef = useRef<HTMLSelectElement>(null)
  const {budgets, addExpense} = useBudgets()

  const onSubmit = (event: FormEvent) => {
    // do not refresh browser
    event.preventDefault()

    const forBudget = forBudgetRef.current?.value
    const description = descriptionRef.current?.value
    const amount = amountRef.current?.value

    if (!description || !amount || !forBudget) {
      return
    }

    addExpense(forBudget, description, parseFloat(amount))
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required/>
          </Form.Group>
          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" min={0} step={0.01} required/>
          </Form.Group>
          <Form.Group controlId="forBudget" className="mb-3">
            <Form.Label>For Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetId}
              ref={forBudgetRef}
              required
            >
              <option key={NO_CAT_BUDGET_ID} value={NO_CAT_BUDGET_ID}>
                No Category
              </option>
              {budgets.map(it => (
                <option key={it.id} value={it.id}>
                  {it.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
