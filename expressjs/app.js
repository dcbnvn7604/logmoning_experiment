const express = require('express')
const morgan = require('morgan')
const rfs = require("rotating-file-stream")
const winston = require('winston')
const { AsyncLocalStorage } = require('async_hooks')
const { v4: uuid } = require("uuid");
const { combine, timestamp, json } = winston.format

LOG_DIR = '/var/log/expressjs'

const accessLogStream = rfs.createStream("access.log", {
    size: "10M",
    interval: "1d",
    maxFiles: 3,
    path: LOG_DIR
})

const appLogStream = rfs.createStream("app.log", {
    size: "10M",
    interval: "1d",
    maxFiles: 3,
    path: LOG_DIR
})

const winstonLogger = winston.createLogger({
    level: 'debug',
    format: combine(timestamp(), json()),
    defaultMeta: { service: 'expressjs' },
    transports: [new winston.transports.Stream({
        stream: appLogStream
    })],
});

const logger = {
    debug: (info) => {
        store = context.getStore()
        if (store && store.get('requestId')) {
            winstonLogger.debug(info, {'requestId': store.get('requestId')})
        } else {
            winstonLogger.debug(info)
        }
    },
    info: (info) => {
        store = context.getStore()
        if (store && store.get('requestId')) {
            winstonLogger.info(info, {'requestId': store.get('requestId')})
        } else {
            winstonLogger.info(info)
        }
    }
}

const app = express()

app.use(morgan('combined', {
    skip: (req, res) => {
        return req.originalUrl == '/healcheck'
    },
    stream: accessLogStream
}))

const context = new AsyncLocalStorage();
app.use((req, res, next) => {
    const store = new Map();
    context.run(store, () => {
        store.set('requestId', uuid())
        next()
    });
})

const port = 80

app.get('/healcheck', (req, res) => {
    res.send('server healthy')
})

app.get('/api/chain', (req, res) => {
    logger.debug({data: 'data debug'})
    res.send('success')
})

app.listen(port, () => {
    logger.info('server running')
})
