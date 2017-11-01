package com.waste.human

import javax.persistence.*

@Entity
@Table(name = "human")
class HumanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0

    var firstName: String = ""
    var lastName: String = ""
    var email: String = ""

    constructor(){}

    constructor(id: Long, firstName: String, lastName: String, email: String) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }

    constructor(firstName: String, lastName: String, email: String) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }

}