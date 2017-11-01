package com.waste.human

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController("/human")
open class HumanController(var humanService: HumanService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    open fun create(@RequestBody humanRequest: HumanApiWrapper) : HumanApiWrapper = humanService.create(humanRequest)

}