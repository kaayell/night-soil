package com.waste

import com.vaadin.annotations.Theme
import com.vaadin.server.VaadinRequest
import com.vaadin.ui.UI
import com.vaadin.spring.annotation.SpringUI
import com.vaadin.ui.Button
import com.vaadin.ui.Notification

@SpringUI
@Theme("valo")
class VaadinUI : UI() {

    override fun init(request: VaadinRequest) {
        content = Button("Click me") { e -> Notification.show("Hello Spring+Vaadin user!") }
    }
}