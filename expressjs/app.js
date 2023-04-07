const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))

const port = 80

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.info('App running')
})