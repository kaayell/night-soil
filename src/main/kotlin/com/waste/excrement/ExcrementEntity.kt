package com.waste.excrement

import javax.persistence.*

@Entity
@Table(name = "excrement")
class ExcrementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0

    var humanId: Long = 0
    var bristolType: Int = 0
    var durationInMinutes: Int = 0
    var comments: String = ""
    var dateTimeInMilliseconds: String = ""

    constructor() {}

    constructor(id: Long, humanId: Long, bristolType: Int, durationInMinutes: Int, comments: String, dateTimeInMilliseconds: String) {
        this.id = id
        this.humanId = humanId
        this.bristolType = bristolType
        this.durationInMinutes = durationInMinutes
        this.comments = comments
        this.dateTimeInMilliseconds = dateTimeInMilliseconds
    }

    constructor(humanId: Long, bristolType: Int, durationInMinutes: Int, comments: String, dateTimeInMilliseconds: String) {
        this.humanId = humanId
        this.bristolType = bristolType
        this.durationInMinutes = durationInMinutes
        this.comments = comments
        this.dateTimeInMilliseconds = dateTimeInMilliseconds
    }
}