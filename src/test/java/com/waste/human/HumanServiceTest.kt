package com.waste.human

import com.nhaarman.mockito_kotlin.*
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class HumanServiceTest {

    var humanRepository: HumanRepository = mock()
    var humanService = HumanService(humanRepository)

    @BeforeEach
    internal fun setUp() {
        whenever(humanRepository.save(any<HumanEntity>()))
            .thenReturn(HumanEntity(id = 1, firstName = "first", lastName = "last", email = "email"))
    }

    @Test
    fun `should save a human`() {
        humanService.create(HumanApiWrapper("first", "last", "email"))
        argumentCaptor<HumanEntity>().let {
            verify(humanRepository).save(it.capture())
            val humanEntity = it.firstValue
            assertThat(humanEntity.firstName).isEqualTo("first")
            assertThat(humanEntity.lastName).isEqualTo("last")
            assertThat(humanEntity.email).isEqualTo("email")
        }
    }

    @Test
    fun `should return the human the database created`() {
        val actualHuman = humanService.create(HumanApiWrapper("first", "last", "email"))
        assertThat(actualHuman.id).isEqualTo(1)
        assertThat(actualHuman.firstName).isEqualTo("first")
        assertThat(actualHuman.lastName).isEqualTo("last")
        assertThat(actualHuman.email).isEqualTo("email")
    }
}