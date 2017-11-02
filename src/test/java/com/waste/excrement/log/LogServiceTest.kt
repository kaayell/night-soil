package com.waste.excrement.log

import com.nhaarman.mockito_kotlin.*
import com.waste.excrement.ExcrementEntity
import com.waste.excrement.ExcrementRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

internal class LogServiceTest {

    val excrementRepository: ExcrementRepository = mock()
    val logService = LogService(excrementRepository)

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
}