package com.waste.excrement.log

import com.waste.excrement.ExcrementEntity
import com.waste.excrement.ExcrementRepository
import org.springframework.stereotype.Service

@Service
open class LogService(val excrementRepository: ExcrementRepository) {

    open fun create(humanId: Long, logRequest: LogRequest) {
        excrementRepository.save(ExcrementEntity(
            humanId = humanId,
            bristolType = logRequest.bristolType,
            durationInMinutes = logRequest.durationInMinutes,
            comments = logRequest.comments))
    }
}