package com.waste.excrement.log

import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders

class LogControllerTest {

    var logService: LogService = mock()
    var controller = LogController(logService)
    var mockMvc: MockMvc = MockMvcBuilders.standaloneSetup(controller).build()

    @Test
    fun `should have a create log endpoint`() {
        mockMvc.perform(post("/human/12345/log")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n  " +
                "\"bristolType\": 1,\n " +
                "\"durationInSeconds\": \"82727\",\n " +
                "\"comments\": \"pewp\"\n" +
                "}")
        ).andExpect(status().isCreated)
    }

    @Test
    fun `should call to log poop service`() {
        val logRequest = LogRequest(1, 928292, "pewp")
        controller.create(12345, logRequest)

        verify(logService).create(12345, logRequest)
    }

}