package com.github.quillraven.budget.model

import javax.persistence.*

@Entity
@Table(name = "TBL_EXPENSES")
data class Expense(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  val id: String?,
  val budgetId: String,
  val description: String,
  val amount: Double,
)
