'use strict'

const CatLog = use('cat-log')

class Logger {

    constructor() {

    }

    * getInstance(clazz) {
        return new CatLog(clazz)
    }
}
