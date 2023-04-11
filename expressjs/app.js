const express = require('express')
const morgan = require('morgan')
const winston = require('winston')
const { AsyncLocalStorage } = require('async_hooks')
const { v4: uuid } = require("uuid");
const { combine, timestamp, json } = winston.format

const winstonLogger = winston.createLogger({
    level: 'debug',
    format: combine(timestamp(), json()),
    defaultMeta: { service: 'expressjs' },
    transports: [new winston.transports.Console()],
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
    }
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
