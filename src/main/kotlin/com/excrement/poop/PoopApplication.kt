package com.excrement.poop

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class PoopApplication

fun main(args: Array<String>) {
    SpringApplication.run(PoopApplication::class.java, *args)
}
