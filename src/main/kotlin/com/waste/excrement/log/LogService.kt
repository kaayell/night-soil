package com.waste.excrement.log

import com.waste.excrement.ExcrementEntity
import com.waste.excrement.ExcrementRepository
import org.springframework.stereotype.Service

@Service
open class LogService(val excrementRepository: ExcrementRepository) {

    open fun create(humanId: Long, logApiWrapper: LogApiWrapper) {
        excrementRepository.save(ExcrementEntity(
            humanId = humanId,
            bristolType = logApiWrapper.bristolType,
            durationInMinutes = logApiWrapper.durationInMinutes,
            comments = logApiWrapper.comments,
            dateTimeInMilliseconds = logApiWrapper.dateTimeInMilliseconds))
    }

    open fun getLogs(humanId: Long): List<LogApiWrapper> =
        excrementRepository.findAllByHumanId(humanId)
            .map { excrementEntity ->
                LogApiWrapper(
                    excrementEntity.bristolType,
                    excrementEntity.durationInMinutes,
                    excrementEntity.comments,
                    excrementEntity.dateTimeInMilliseconds
                )
            }

}