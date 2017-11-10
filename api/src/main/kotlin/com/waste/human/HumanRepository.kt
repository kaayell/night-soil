package com.waste.human

import org.springframework.data.jpa.repository.JpaRepository

interface HumanRepository : JpaRepository<HumanEntity, Long> {
    fun findByEmail(email: String) : HumanEntity?
}