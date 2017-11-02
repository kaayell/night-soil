package com.waste

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class PoopUIApplication

fun main(args: Array<String>) {
    SpringApplication.run(PoopUIApplication::class.java, *args)
}
