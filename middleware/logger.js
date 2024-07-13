const { uuid } = require('uuidv4')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

// Create a log file and append to log folder.
const logEvents = async (message, logFileName) => {
    const dateTime = `${('yyyyMMdd\tHH:mm:ss', new Date())}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (error) {
        console.log(error)
    }
}

// Log incoming request events
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.md')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }