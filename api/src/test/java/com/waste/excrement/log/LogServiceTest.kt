package com.waste.excrement.log

import com.nhaarman.mockito_kotlin.*
import com.waste.excrement.ExcrementEntity
import com.waste.excrement.ExcrementRepository
import com.waste.human.HumanEntity
import com.waste.human.HumanRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

internal class LogServiceTest {

    val excrementRepository: ExcrementRepository = mock()
    val humanRepository: HumanRepository = mock()
    val logService = LogService(excrementRepository, humanRepository)

    @Test
    fun `should save excrement to repository`() {
        logService.create(12345, LogApiWrapper(1, 3, "pewp", "123456478"))
        argumentCaptor<ExcrementEntity>().let {
            verify(excrementRepository).save(it.capture())
            val excrementEntity = it.firstValue
            assertThat(excrementEntity.humanId).isEqualTo(12345)
            assertThat(excrementEntity.bristolType).isEqualTo(1)
            assertThat(excrementEntity.durationInMinutes).isEqualTo(3)
            assertThat(excrementEntity.comments).isEqualTo("pewp")
            assertThat(excrementEntity.dateTimeInMilliseconds).isEqualTo("123456478")
        }
    }

    @Test
    fun `should get list of logs from repository`() {
        val listOf = listOf(ExcrementEntity(
            humanId = 2L,
            bristolType = 1,
            durationInMinutes = 2,
            comments = "hi",
            dateTimeInMilliseconds = "827272"))
        whenever(excrementRepository.findAllByHumanId(any())).thenReturn(listOf)
        val actualLogList = logService.getLogs(12345)
        assertThat(actualLogList).hasSize(1)
        assertThat(actualLogList[0].bristolType).isEqualTo(1)
        assertThat(actualLogList[0].durationInMinutes).isEqualTo(2)
        assertThat(actualLogList[0].comments).isEqualTo("hi")
        assertThat(actualLogList[0].dateTimeInMilliseconds).isEqualTo("827272")
    }

    @Test
    fun `should get human from human repository for summary`() {
        logService.getSummary(12345)
        verify(humanRepository).findOne(12345)
    }

    @Test
    fun `should get all logs for human to use for summary`() {
        logService.getSummary(12345)
        verify(excrementRepository).findAllByHumanId(12345)
    }

    @Test
    fun `should calculate how many minutes a user has pooped`() {
        val listOf = listOf(
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 27, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 22, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 21, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 3, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 15, comments = "hi", dateTimeInMilliseconds = "827272")
        )
        whenever(excrementRepository.findAllByHumanId(any())).thenReturn(listOf)
        whenever(humanRepository.findOne(any())).thenReturn(HumanEntity(1, "first", "last", "email", 15.24))

        val summary = logService.getSummary(2)
        assertThat(summary.minutesToDate).isEqualTo(88)
    }

    @Test
    fun `should calcuate how much money the user has made while pooping`() {
        val listOf = listOf(
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 27, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 22, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 21, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 3, comments = "hi", dateTimeInMilliseconds = "827272"),
            ExcrementEntity(humanId = 2L, bristolType = 1, durationInMinutes = 15, comments = "hi", dateTimeInMilliseconds = "827272")
        )
        whenever(excrementRepository.findAllByHumanId(any())).thenReturn(listOf)

        whenever(humanRepository.findOne(any())).thenReturn(HumanEntity(1, "first", "last", "email", 15.24))

        val summary = logService.getSummary(2)
        assertThat(summary.moneyToDate).isEqualTo("22.35")
    }
}