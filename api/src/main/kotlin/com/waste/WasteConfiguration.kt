package com.waste

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories


@EnableJpaRepositories
//@EnableOAuth2Sso
@Configuration
open class WasteConfiguration