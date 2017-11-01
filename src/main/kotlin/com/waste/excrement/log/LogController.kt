package com.waste.excrement.log

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
open class LogController(val service: LogService) {

    @PostMapping("/human/{humanId}/log")
    @ResponseStatus(HttpStatus.CREATED)
    open fun create(@PathVariable(name = "humanId") humanId: Long, @RequestBody logRequest: LogRequest) {
        service.create(humanId, logRequest)
    }

}