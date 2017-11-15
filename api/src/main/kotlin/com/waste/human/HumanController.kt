package com.waste.human

import org.springframework.data.repository.query.Param
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController("/human")
@CrossOrigin
open class HumanController(var humanService: HumanService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    open fun create(@RequestBody humanRequest: HumanApiWrapper): HumanApiWrapper =
        humanService.create(humanRequest)

    @GetMapping
    open fun get(@Param("email") email: String? = null): List<HumanApiWrapper> =
        if (email != null) humanService.find(email) else humanService.getAll()

    @PutMapping
    open fun update(@RequestBody humanRequest: HumanApiWrapper) =
        humanService.update(humanRequest)

}