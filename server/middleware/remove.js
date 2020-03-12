const fs = require('fs')
const path = './static/articles'

function remover(imageName) {
  const way = path + imageName

  fs.unlink(way, function (err) {
    if (err) return console.log(err)
  })
}

module.exports = remover