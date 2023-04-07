const express = require('express')

const app = express()

const port = 80

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.info('App running')
})