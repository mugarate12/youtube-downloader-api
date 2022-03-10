const express = require('express')
// const youtubedl = require('youtube-dl')
const youtubedl = require('youtube-dl-exec')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const router = express.Router()

router.post('/download', async (req, res) => {
  const { link } = req.body

  await youtubedl(link, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: link
  })
    .then(async (output) => {
      let format = '244 - 640x480 (480p)'
      const formatsArray = output['formats']
      let url = ''
      // console.log(formatsArray);

      formatsArray.forEach(element => {
        if (element['format'] === format) {
          url = element['url']
        }
      })
      
      console.log('To baixando!', url);
      const data = await axios.get(url, { responseType: 'arraybuffer' })
        .then(response => {
          return response.data
        })
        .catch(error => console.log('deu errado'))

      if (!!data) {
        const filename = `./meuvideo.mp4`

        fs.writeFileSync(filename, data, 'binary')
      }
    })

  const filePath = path.resolve(__dirname, '..', 'meuvideo.mp4')
  const file = fs.readFileSync(filePath)
  const filename = path.basename(filePath)

  return res
    .set('Content-Type', 'application/mp4')
    .set('Content-Disposition', `attachment; filename=${filename}`)
    .send(file)
})

module.exports = router