package com.waste

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso

@SpringBootApplication
open class WasteApplication

fun main(args: Array<String>) {
    SpringApplication.run(WasteApplication::class.java, *args)
}
