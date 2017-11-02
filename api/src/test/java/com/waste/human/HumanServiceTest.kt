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
            .thenReturn(HumanEntity(id = 1, firstName = "first", lastName = "last", email = "email", hourlyRate = 1.0))
    }

    @Test
    fun `should save a human`() {
        humanService.create(HumanApiWrapper("first", "last", "email", 1.0))
        argumentCaptor<HumanEntity>().let {
            verify(humanRepository).save(it.capture())
            val humanEntity = it.firstValue
            assertThat(humanEntity.firstName).isEqualTo("first")
            assertThat(humanEntity.lastName).isEqualTo("last")
            assertThat(humanEntity.email).isEqualTo("email")
            assertThat(humanEntity.hourlyRate).isEqualTo(1.0)
        }
    }

    @Test
    fun `should return the human the database created`() {
        val actualHuman = humanService.create(HumanApiWrapper("first", "last", "email", 1.0))
        assertThat(actualHuman.id).isEqualTo(1)
        assertThat(actualHuman.firstName).isEqualTo("first")
        assertThat(actualHuman.lastName).isEqualTo("last")
        assertThat(actualHuman.email).isEqualTo("email")
        assertThat(actualHuman.hourlyRate).isEqualTo(1.0)
    }

    @Test
    fun `should get all humans from repo`() {
        whenever(humanRepository.findAll()).thenReturn(
            listOf(HumanEntity(id = 1L, firstName = "hi", lastName = "yo", email = "sup", hourlyRate = 1.0)))
        val humanList = humanService.getAll()
        assertThat(humanList).hasSize(1)
        assertThat(humanList[0].id).isEqualTo(1L)
        assertThat(humanList[0].firstName).isEqualTo("hi")
        assertThat(humanList[0].lastName).isEqualTo("yo")
        assertThat(humanList[0].email).isEqualTo("sup")
        assertThat(humanList[0].hourlyRate).isEqualTo(1.0)
    }
}