package com.waste.excrement.log

class LogRequest {
    var bristolType: Int = 0
    var durationInMinutes: Int = 0
    var comments: String = ""

    constructor(){}

    constructor(bristolType: Int, durationInMinutes: Int, comments: String) {
        this.bristolType = bristolType
        this.durationInMinutes = durationInMinutes
        this.comments = comments
    }
}