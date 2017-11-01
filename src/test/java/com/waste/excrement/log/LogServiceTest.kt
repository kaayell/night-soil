package com.waste.excrement.log

import com.nhaarman.mockito_kotlin.argumentCaptor
import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import com.waste.excrement.ExcrementEntity
import com.waste.excrement.ExcrementRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

internal class LogServiceTest {

    val excrementRepository: ExcrementRepository = mock()
    val logService = LogService(excrementRepository)

    @Test
    fun `should save excrement to repository`() {
        logService.create(12345, LogRequest(1, 3, "pewp"))
        argumentCaptor<ExcrementEntity>().let {
            verify(excrementRepository).save(it.capture())
            val excrementEntity = it.firstValue
            assertThat(excrementEntity.humanId).isEqualTo(12345)
            assertThat(excrementEntity.bristolType).isEqualTo(1)
            assertThat(excrementEntity.durationInMinutes).isEqualTo(3)
            assertThat(excrementEntity.comments).isEqualTo("pewp")
        }
    }
}