'use strict'

const searchMarsSuccess = function () {
  $('.message').text('Searching Mars Photos')
  $('.mars-search-message').hide()
}

const searchMarsFail = function () {
  $('.message').text('No Pictures for that Day')
  $('.mars-list').empty()
}

const searchSoundsSuccess = function () {
  $('.message').text('Viewing Space Sounds')
  $('.search-message').hide()
}

const searchPatentsSuccess = function () {
  $('.message').text('Searching NASA Patents')
  $('.search-message').hide()
}

$(function () {
  $('.selector').animatedHeadline({
    animationType: 'rotate-3'
  })
})

module.exports = true

module.exports = {
  searchMarsFail,
  searchMarsSuccess,
  searchSoundsSuccess,
  searchPatentsSuccess
}
