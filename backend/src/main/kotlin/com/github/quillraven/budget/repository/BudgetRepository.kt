package com.github.quillraven.budget.repository

import com.github.quillraven.budget.model.Budget
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BudgetRepository : JpaRepository<Budget, String>
