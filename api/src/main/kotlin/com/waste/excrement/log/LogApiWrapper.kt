package com.waste.excrement.log

class LogApiWrapper {
    var bristolType: Int = 0
    var durationInMinutes: Int = 0
    var comments: String = ""
    var dateTimeInMilliseconds: String = ""

    constructor(){}

    constructor(bristolType: Int, durationInMinutes: Int, comments: String, dateTimeInMilliseconds: String) {
        this.bristolType = bristolType
        this.durationInMinutes = durationInMinutes
        this.comments = comments
        this.dateTimeInMilliseconds = dateTimeInMilliseconds
    }
}