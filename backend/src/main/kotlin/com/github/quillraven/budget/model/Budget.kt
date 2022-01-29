package com.github.quillraven.budget.model

import javax.persistence.*

@Entity
@Table(name = "TBL_BUDGETS")
data class Budget(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  val id: String?,
  val name: String,
  val maxLimit: Int
)
