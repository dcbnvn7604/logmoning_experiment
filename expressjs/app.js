const express = require('express')
const morgan = require('morgan')
const rfs = require("rotating-file-stream")

const accessLogStream = rfs.createStream("access.log", {
    size: "10M",
    interval: "1d",
    maxFiles: 3,
    path: '/var/log/expressjs'
})

const app = express()
app.use(morgan('combined', {
    skip: (req, res) => {
        return req.originalUrl == '/healcheck'
    },
    stream: accessLogStream
}))

const port = 80

app.get('/healcheck', (req, res) => {
    res.send('server healthy')
})

app.get('/api/chain', (req, res) => {
    res.send('success')
})

app.listen(port, () => {
    console.info('server running')
})
