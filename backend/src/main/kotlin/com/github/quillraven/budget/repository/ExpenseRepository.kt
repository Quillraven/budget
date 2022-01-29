package com.github.quillraven.budget.repository

import com.github.quillraven.budget.model.Expense
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ExpenseRepository : JpaRepository<Expense, String> {
  fun findExpensesByBudgetId(budgetId: String): List<Expense>
}
