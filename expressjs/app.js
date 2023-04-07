const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined', {
    skip: (req, res) => {
        return req.baseUrl != '/healcheck'
    }
}))

const port = 80

app.get('/healcheck', (req, res) => {
    res.send('server healthy')
})

app.listen(port, () => {
    console.info('server running')
})
