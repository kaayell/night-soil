package com.waste.excrement

import org.springframework.data.jpa.repository.JpaRepository

interface ExcrementRepository : JpaRepository<ExcrementEntity, Long>