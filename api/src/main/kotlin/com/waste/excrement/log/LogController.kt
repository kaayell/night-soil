package com.waste.excrement.log

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
open class LogController(val service: LogService) {

    @PostMapping("/human/{humanId}/log")
    @ResponseStatus(HttpStatus.CREATED)
    open fun create(@PathVariable(name = "humanId") humanId: Long, @RequestBody logApiWrapper: LogApiWrapper) =
        service.create(humanId, logApiWrapper)

    @GetMapping("/human/{humanId}/log")
    open fun getLogs(@PathVariable(name = "humanId") humanId: Long): List<LogApiWrapper> = service.getLogs(humanId)

}