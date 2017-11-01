package com.waste.human

class HumanApiWrapper {
    var id: Long = 0
    var firstName: String = ""
    var lastName: String = ""
    var email: String = ""

    constructor(){}

    constructor(firstName: String, lastName: String, email: String) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }

    constructor(id: Long, firstName: String, lastName: String, email: String) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }
}