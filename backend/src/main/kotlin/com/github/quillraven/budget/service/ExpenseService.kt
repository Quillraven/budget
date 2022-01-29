package com.github.quillraven.budget.service

import com.github.quillraven.budget.model.Expense
import com.github.quillraven.budget.repository.ExpenseRepository
import org.springframework.stereotype.Service

@Service
class ExpenseService(private val repository: ExpenseRepository) {
  fun findExpenses(): List<Expense> {
    return repository.findAll()
  }

  fun findExpensesByBudgetId(budgetId: String): List<Expense> {
    return repository.findExpensesByBudgetId(budgetId)
  }

  fun saveExpense(expense: Expense): Expense {
    return repository.save(expense)
  }

  fun deleteExpense(expense: Expense) {
    repository.delete(expense)
  }

  fun clearBudgetId(budgetId: String) {
    val expenses = repository.findExpensesByBudgetId(budgetId)
      .map { it.copy(budgetId = NO_CATEGORY_ID) }
    repository.saveAll(expenses)
  }

  companion object {
    private const val NO_CATEGORY_ID = "no-cat"
  }
}
