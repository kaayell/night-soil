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
    var hourlyRate: Double = 0.0

    constructor(){}

    constructor(id: Long, firstName: String, lastName: String, email: String, hourlyRate: Double) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.hourlyRate = hourlyRate
    }

    constructor(firstName: String, lastName: String, email: String, hourlyRate: Double) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.hourlyRate = hourlyRate
    }
}