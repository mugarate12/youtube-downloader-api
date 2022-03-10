const express = require('express')
const downloader = require('./downloader')
const app = express()
const http = require('http')

const server = http.createServer(app)

app.use(express.json())
app.use(downloader)

server.listen(3333, console.log('Server is running!'))