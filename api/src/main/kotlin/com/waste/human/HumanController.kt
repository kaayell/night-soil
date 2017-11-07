package com.waste.human

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController("/human")
@CrossOrigin
open class HumanController(var humanService: HumanService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    open fun create(@RequestBody humanRequest: HumanApiWrapper) : HumanApiWrapper = humanService.create(humanRequest)

    @GetMapping
    open fun getAll() : List<HumanApiWrapper> = humanService.getAll()

}