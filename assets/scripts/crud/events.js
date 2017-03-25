'use strict'

const api = require('./api')
const ui = require('./ui')
// const showFavoriteTemplate = require('../templates/favorite.handlebars')

// const store = require('../store')

const onShowPictures = function (event) {
  if (event && event.preventDefault) {
    event.preventDefault()
  }
  api.showPictures()
    .then(function (response) {
      console.log(response)
    })
    .fail(ui.fail)
}

const addHandlers = () => {
  $('#saved-pictures').on('click', onShowPictures)

}

module.exports = {
  addHandlers
}
