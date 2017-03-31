'use strict'

const searchMarsSuccess = function () {
  $('.message').text('Searching Mars Photos')
}

const searchMarsFail = function () {
  $('.message').text('No Pictures for that Day')
  $('.mars-list').empty()
}

const searchSoundsSuccess = function () {
  $('.message').text('Viewing Space Sounds')
}

const searchPatentsSuccess = function () {
  $('.message').text('Searching NASA Patents')
}

module.exports = {
  searchMarsFail,
  searchMarsSuccess,
  searchSoundsSuccess,
  searchPatentsSuccess
}
