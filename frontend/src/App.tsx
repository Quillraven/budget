import React, {useState} from 'react';
import {Button, Container, Stack} from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import {NO_CAT_BUDGET_ID, useBudgets} from "./context/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";
import NoCatBudgetCard from "./components/NoCatBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

export default () => {
  const [showAddBudgetModal, setShowBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowExpenseModal] = useState(false)
  const {budgets} = useBudgets()
  const [budgetIdForAddExpense, setBudgetIdForAddExpense] = useState(NO_CAT_BUDGET_ID)
  const [budgetIdForViewExpenses, setBudgetIdForViewExpenses] = useState<string | null>(null)

  const showExpenseModal = (budgetId: string | undefined = undefined) => {
    // open modal and set budget that will be pre-selected in the budget dropdown
    setShowExpenseModal(true)
    setBudgetIdForAddExpense(budgetId ? budgetId : NO_CAT_BUDGET_ID)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => showExpenseModal()}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          {
            budgets.map(it => (
                <BudgetCard
                  key={it.id}
                  name={it.name}
                  spent={it.expenses.reduce((sum, expense) => sum + expense.amount, 0)}
                  limit={it.maxLimit}
                  onAddExpenseClick={() => showExpenseModal(it.id)}
                  onViewExpensesClick={() => setBudgetIdForViewExpenses(it.id)}
                />
              )
            )
          }
          <NoCatBudgetCard
            onAddExpenseClick={showExpenseModal}
            onViewExpensesClick={() => setBudgetIdForViewExpenses(NO_CAT_BUDGET_ID)}
          />
          <TotalBudgetCard/>
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} onClose={() => setShowBudgetModal(false)}/>
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={budgetIdForAddExpense}
        onClose={() => setShowExpenseModal(false)}
      />
      <ViewExpensesModal budgetIdToView={budgetIdForViewExpenses} onClose={() => setBudgetIdForViewExpenses(null)}/>
    </>
  );
}
