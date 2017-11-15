package com.waste.excrement.log

class LogSummaryApiWrapper {
    var minutesToDate: Int = 0
    var moneyToDate: String = ""

    constructor() {}

    constructor(minutesToDate: Int, moneyToDate: String) {
        this.minutesToDate = minutesToDate
        this.moneyToDate = moneyToDate
    }
}