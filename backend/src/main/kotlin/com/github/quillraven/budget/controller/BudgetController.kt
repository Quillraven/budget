package com.github.quillraven.budget.controller

import com.github.quillraven.budget.model.Budget
import com.github.quillraven.budget.service.BudgetService
import com.github.quillraven.budget.service.ExpenseService
import org.springframework.http.HttpStatus
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("api/v1/budgets")
@CrossOrigin(origins = ["http://localhost:3000"])
class BudgetController(
  private val budgetService: BudgetService,
  private val expenseService: ExpenseService,
) {
  @GetMapping
  fun findBudgets() = budgetService.findBudgets()

  @PostMapping
  fun saveBudget(@RequestBody budget: Budget) = budgetService.saveBudget(budget)

  @DeleteMapping
  @Transactional
  fun deleteBudget(@RequestBody budget: Budget) {
    if (budget.id == null) {
      throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Budget must have a valid id")
    }

    expenseService.clearBudgetId(budget.id)
    budgetService.deleteBudget(budget)
  }
}
