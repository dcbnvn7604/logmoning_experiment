const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined', {
    skip: (req, res) => {
        return req.originalUrl == '/healcheck'
    }
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
