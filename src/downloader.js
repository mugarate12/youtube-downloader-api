const express = require('express')
const youtubedl = require('youtube-dl')
const fs = require('fs')

const router = express.Router()

router.get('/download', async (req, res) => {
  const { link } = req.body

  const video = youtubedl(
    link,
    ['--format=18'],
    { cwd: __dirname }
  )

  await video.on('info', function(info) {
    console.log('Download iniciado!')
    console.log(`nome do arquivo: ${info._filename}`)
    console.log(`Tamanho: ${info.size}`)
  })

  await video.pipe(fs.createWriteStream('myvideo.mp4'))
})

module.exports = router