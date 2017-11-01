package com.waste

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class WasteApplication

fun main(args: Array<String>) {
    SpringApplication.run(WasteApplication::class.java, *args)
}
