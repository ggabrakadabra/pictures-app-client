'use strict'
const store = require('../store')
const api = require('../crud/api')
const ui = require('../crud/ui')
const apiUi = require('./ui')
const config = require('../config')
const getFormFields = require('../../../lib/get-form-fields.js')
const marsTemplate = require('../templates/marsrover.handlebars')
const soundsTemplate = require('../templates/sounds.handlebars')
const patentsTemplate = require('../templates/patents.handlebars')
const apodTemplate = require('../templates/apod.handlebars')
const apodTodayTemplate = require('../templates/apodtoday.handlebars')
const neoTemplate = require('../templates/neo.handlebars')
const neoStatsTemplate = require('../templates/neostats.handlebars')

const showApod = function () {
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/apod/today',
    method: 'POST'
  }).done(function (results) {
    $('.apod-results').empty()
    const apodResult = apodTodayTemplate(results)
    $('.apod-results').append(apodResult)
    $('.add-picture').on('submit', function (event) {
      if (event && event.preventDefault) {
        event.preventDefault()
      }
      const data = getFormFields(event.target)
      api.createPictures(data)
          .then(api.addToFavoritesList)
          .then(ui.addPictureToFavorites)
          .fail(ui.addFavoriteFail)
    })
  })
}

const searchPatentsApi = function () {
  const searchText = $('#search-box').val()
  const data = {
    search: {
      query: searchText
    }
  }
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/patents',
    method: 'POST',
    data: data
  }).done(function (results) {
    $('.search-results').empty()
    for (let i = 0; i < results.results.length; i++) {
      const singleSearchResult = patentsTemplate(results.results[i])
      $('.search-results').append(singleSearchResult)
    }
  })
  .then(apiUi.searchPatentsSuccess)
}

const searchSoundsApi = function () {
  const searchText = $('#search-box').val()
  const data = {
    search: {
      query: searchText
    }
  }
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/sounds',
    method: 'POST',
    data: data
  }).done(function (results) {
    $('.search-results').empty()
    for (let i = 0; i < results.results.length; i++) {
      const singleSearchResult = soundsTemplate(results.results[i])
      $('.search-results').append(singleSearchResult)
    }
  })
  .then(apiUi.searchSoundsSuccess)
}

const neoDailyFeed = function () {
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/neo/today',
    method: 'POST'
  }).done(function (results) {
    $('.neo-results').empty()
    const neoResults = neoTemplate(results)
    $('.neo').append(neoResults)
  })
}

const neoStats = function () {
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/stats',
    method: 'POST'
  }).done(function (results) {
    $('.neo-results').empty()
    const neoResults = neoStatsTemplate(results)
    $('.neo-stats').append(neoResults)
  })
}

const searchMarsRoverApi = function () {
  const earthDate = $('#earth-date').val()
  const data = {
    search: {
      query: earthDate
    }
  }
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/mars',
    method: 'POST',
    data: data
  }).done(function (results) {
    $('.mars-list').empty()
    for (let i = 0; i < results.photos.length; i++) {
      const singleSearchResult = marsTemplate(results.photos[i])
      $('.mars-list').append(singleSearchResult)
    }
    $('#mars-search-results').flipster({
      itemContainer: 'ul',
      itemSelector: 'li',
      style: 'coverflow',
      start: '0',
      keyboard: false,
      click: true,
      scrollwheel: true,
      fadeIn: 400,
      loop: false,
      autoplay: false,
      spacing: -0.5
    })
    $('#mars-search-results').flipster('index')
  })
  .then(apiUi.searchMarsSuccess)
  .fail(apiUi.searchMarsFail)
}

const searchApod = function () {
  const apodDate = $('#apod-date').val()
  const data = {
    search: {
      query: apodDate
    }
  }
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/apod',
    method: 'POST',
    data: data
  }).done(function (results) {
    $('.apod-results').empty()
    const apodResult = apodTemplate(results)
    $('.apod-results').append(apodResult)
    $('.add-picture').on('submit', function (event) {
      if (event && event.preventDefault) {
        event.preventDefault()
      }
      const data = getFormFields(event.target)
      api.createPictures(data)
          .then(api.addToFavoritesList)
          .then(ui.addPictureToFavorites)
          .fail(ui.addFavoriteFail)
    })
  })
}

const addHandlers = () => {
  $('.patents-search').on('click', searchPatentsApi)
  $('.sounds-search').on('click', searchSoundsApi)
  $('.search-by-date').on('click', searchMarsRoverApi)
  $('#apod-link').on('click', showApod)
  $('.apod-search').on('click', searchApod)
}

module.exports = {
  addHandlers,
  neoDailyFeed,
  neoStats
}
