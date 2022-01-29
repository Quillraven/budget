import {Button, Form, Modal} from "react-bootstrap";
import {FormEvent, useRef} from "react";
import {useBudgets} from "../context/BudgetContext";

interface AddBudgetModalProps {
  show: boolean
  onClose: () => void
}

export default ({show, onClose}: AddBudgetModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const limitRef = useRef<HTMLInputElement>(null)
  const {addBudget} = useBudgets()

  const onSubmit = (event: FormEvent) => {
    // do not refresh browser
    event.preventDefault()

    const name = nameRef.current?.value
    const limit = limitRef.current?.value

    if (!name || !limit) {
      return
    }

    addBudget(name, parseFloat(limit))
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required/>
          </Form.Group>
          <Form.Group controlId="limit" className="mb-3">
            <Form.Label>Limit</Form.Label>
            <Form.Control ref={limitRef} type="number" min={0} step={0.01} required/>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
