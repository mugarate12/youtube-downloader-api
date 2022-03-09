const express = require('express')
const downloader = require('./downloader')
const app = express()

app.use(express.json())
app.use(downloader)

app.listen(3333, console.log('Server is running!'))