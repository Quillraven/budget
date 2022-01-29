package com.github.quillraven.budget.service

import com.github.quillraven.budget.model.Budget
import com.github.quillraven.budget.repository.BudgetRepository
import org.springframework.stereotype.Service

@Service
class BudgetService(private val repository: BudgetRepository) {
  fun findBudgets(): List<Budget> {
    return repository.findAll()
  }

  fun saveBudget(budget: Budget): Budget {
    return repository.save(budget)
  }

  fun deleteBudget(budget: Budget) {
    repository.delete(budget)
  }
}
