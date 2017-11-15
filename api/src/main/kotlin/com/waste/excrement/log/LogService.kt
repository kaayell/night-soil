package com.waste.excrement.log

import com.waste.excrement.ExcrementEntity
import com.waste.excrement.ExcrementRepository
import com.waste.human.HumanRepository
import org.springframework.stereotype.Service

@Service
open class LogService(
    val excrementRepository: ExcrementRepository,
    val humanRepository: HumanRepository) {

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

    open fun getSummary(humanId: Long): LogSummaryApiWrapper {
        val humanEntity = humanRepository.findOne(humanId)
        val allLogsForHuman = excrementRepository.findAllByHumanId(humanId)

        if(humanEntity == null) {
            return LogSummaryApiWrapper(0, "0")
        }

        val totalMinutes = allLogsForHuman.sumBy { excrementEntity ->
            excrementEntity.durationInMinutes
        }

        val moneyToDate = ((humanEntity.hourlyRate / 60) * totalMinutes).format(2)
        return LogSummaryApiWrapper(totalMinutes, moneyToDate)
    }

    fun Double.format(digits: Int) = java.lang.String.format("%.${digits}f", this)

}