import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import {formatCurrency, progressBarVariant} from "../utils";

export interface BudgetCardProps {
  name: string
  spent: number
  limit: number
  onAddExpenseClick: () => void
  onViewExpensesClick: () => void
  lightBg?: boolean
  hideButtons?: boolean
}

export default ({
                  name,
                  spent,
                  limit,
                  onAddExpenseClick,
                  onViewExpensesClick,
                  lightBg = false,
                  hideButtons = false
                }: BudgetCardProps) => {
  const hasLimit = limit > 0
  const cardClasses = []
  if (hasLimit && spent >= limit) {
    cardClasses.push("bg-danger", "bg-opacity-10")
  } else if (lightBg) {
    cardClasses.push("bg-light")
  }

  return (
    <Card className={cardClasses.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {formatCurrency(spent)}
            {hasLimit &&
              <span className="text-muted fs-6 ms-1">
                / {formatCurrency(limit)}
              </span>
            }
          </div>
        </Card.Title>

        {hasLimit &&
          <ProgressBar
            className="rounded-pill"
            variant={progressBarVariant(spent, limit)}
            min={0}
            max={limit}
            now={spent}
          />
        }


        {!hideButtons &&
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>View Expenses</Button>
          </Stack>
        }
      </Card.Body>
    </Card>
  )
}
