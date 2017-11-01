package com.waste.human

import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.setup.MockMvcBuilders

internal class HumanControllerTest {

    var humanService: HumanService = mock()
    var controller = HumanController(humanService)
    var mockMvc: MockMvc = MockMvcBuilders.standaloneSetup(controller).build()

    @Test
    fun `should have an endpoint to create human`(){
        mockMvc.perform(MockMvcRequestBuilders.post("/human")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n  \"firstName\": \"Micah\",\n  \"lastName\": \"Dorn\",\n  \"email\": \"boop@sup.com\"\n}")
        ).andExpect(MockMvcResultMatchers.status().isCreated)
    }

    @Test
    fun `should call service on create`(){
        val humanRequest = HumanApiWrapper("Bear", "D", "email@hi.com")
        controller.create(humanRequest)
        verify(humanService).create(humanRequest)
    }

    @Test
    fun `should return the created human`(){
        val humanRequest = HumanApiWrapper("Bear", "D", "email@hi.com")
        val expectedHumanResponse = HumanApiWrapper(id = 20L, firstName = "Bear", lastName = "D", email = "email@hi.com")
        whenever(humanService.create(any())).thenReturn(expectedHumanResponse)
        val actualHuman = controller.create(humanRequest)
        assertThat(actualHuman).isEqualTo(expectedHumanResponse)
    }
}