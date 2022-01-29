package com.github.quillraven.budget.controller

import com.github.quillraven.budget.model.Expense
import com.github.quillraven.budget.service.ExpenseService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/v1/expenses")
@CrossOrigin(origins = ["http://localhost:3000"])
class ExpenseController(private val service: ExpenseService) {
  @GetMapping
  fun findExpenses() = service.findExpenses()

  @GetMapping("{budgetId}")
  fun findExpensesByBudgetId(@PathVariable budgetId: String) = service.findExpensesByBudgetId(budgetId)

  @PostMapping
  fun saveExpense(@RequestBody expense: Expense) = service.saveExpense(expense)

  @DeleteMapping
  fun deleteExpense(@RequestBody expense: Expense) = service.deleteExpense(expense)
}
