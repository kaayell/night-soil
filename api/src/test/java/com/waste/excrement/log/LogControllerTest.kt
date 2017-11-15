package com.waste.excrement.log

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
import java.time.LocalDateTime

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
        val logRequest = LogApiWrapper(1, 928292, "pewp", LocalDateTime.now().toString())
        controller.create(12345, logRequest)

        verify(logService).create(12345, logRequest)
    }

    @Test
    fun `should have an endpoint to get poop logs for human`() {
        mockMvc.perform(get("/human/12345/log"))
            .andExpect(content().json("[]"))
    }

    @Test
    fun `should get logs for human from service`() {
        whenever(logService.getLogs(any())).thenReturn(listOf(LogApiWrapper()))
        val logList = controller.getLogs(12345)
        verify(logService).getLogs(12345)
        assertThat(logList).hasSize(1)
    }

    @Test
    fun `should have an endpoint to summary to date for a user`(){
        val logSummaryApiWrapper = LogSummaryApiWrapper(14, "300.0")
        whenever(logService.getSummary(any())).thenReturn(logSummaryApiWrapper)

        mockMvc.perform(get("/human/12345/log/summary"))
            .andExpect(content().json("{}"))
    }

    @Test
    fun `should get summary from service`(){
        val logSummaryApiWrapper = LogSummaryApiWrapper(14, "300.0")
        whenever(logService.getSummary(any())).thenReturn(logSummaryApiWrapper)
        val summary = controller.getSummary(12344)
        assertThat(summary).isEqualTo(logSummaryApiWrapper)
        verify(logService).getSummary(12344)
    }

}