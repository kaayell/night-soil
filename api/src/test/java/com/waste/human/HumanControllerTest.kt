package com.waste.human

import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders

internal class HumanControllerTest {

    var humanService: HumanService = mock()
    var controller = HumanController(humanService)
    var mockMvc: MockMvc = MockMvcBuilders.standaloneSetup(controller).build()

    @Test
    fun `should have an endpoint to create human`() {
        mockMvc.perform(post("/human")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n  \"firstName\": \"Micah\",\n  \"lastName\": \"Dorn\",\n  \"email\": \"boop@sup.com\"\n}")
        ).andExpect(status().isCreated)
    }

    @Test
    fun `should call service on create`() {
        val humanRequest = HumanApiWrapper("Bear", "D", "email@hi.com", 2.0)
        controller.create(humanRequest)
        verify(humanService).create(humanRequest)
    }

    @Test
    fun `should return the created human`() {
        val humanRequest = HumanApiWrapper("Bear", "D", "email@hi.com", 1.0)
        val expectedHumanResponse = HumanApiWrapper(20L, "Bear", "D", "email@hi.com", 1.0)
        whenever(humanService.create(any())).thenReturn(expectedHumanResponse)
        val actualHuman = controller.create(humanRequest)
        assertThat(actualHuman).isEqualTo(expectedHumanResponse)
    }

    @Test
    fun `should have an endpoint to retrieve all humans`() {
        mockMvc.perform(get("/human"))
            .andExpect(content().json("[]"))
    }

    @Test
    fun `should get all humans from service`() {
        val expectedList = listOf(HumanApiWrapper())
        whenever(humanService.getAll()).thenReturn(expectedList)
        val actualHumanList = controller.get()
        verify(humanService).getAll()
        assertThat(actualHumanList).isEqualTo(expectedList)
    }

    @Test
    fun `should have an endpoint to retrieve one human`(){
        mockMvc.perform(get("/human?email=oh@kaay"))
            .andExpect(content().json("[]"))
    }

    @Test
    fun `should get human if email is passed in`(){
        val expectedList = listOf(HumanApiWrapper())
        whenever(humanService.find(any())).thenReturn(expectedList)
        val actualHumanList = controller.get("email@stuff.com")
        verify(humanService).find("email@stuff.com")
        assertThat(actualHumanList).isEqualTo(expectedList)
    }
}