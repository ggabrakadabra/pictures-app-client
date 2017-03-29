'use strict'
const store = require('../store')
const api = require('../crud/api')
const ui = require('../crud/ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const marsTemplate = require('../templates/marsrover.handlebars')
const soundsTemplate = require('../templates/sounds.handlebars')
const patentsTemplate = require('../templates/patents.handlebars')
const apodTemplate = require('../templates/apod.handlebars')
const apodTodayTemplate = require('../templates/apodtoday.handlebars')
const neoTemplate = require('../templates/neo.handlebars')
const neoStatsTemplate = require('../templates/neostats.handlebars')

const showApod = function () {
  const apodUrl = 'http://localhost:4741/search/apod/today'
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: `${apodUrl}`,
    method: 'POST'
  }).done(function (results) {
    console.log('apod', results)
    $('.apod-results').empty()
    const apodResult = apodTodayTemplate(results)
    $('.apod-results').append(apodResult)
    $('.add-picture').on('submit', function (event) {
      if (event && event.preventDefault) {
        event.preventDefault()
      }
      const data = getFormFields(event.target)
      console.log('favortie picture data is', data)
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
  const patentUrl = 'http://localhost:4741/search/patents'
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: `${patentUrl}`,
    method: 'POST',
    data: data
  }).done(function (results) {
    $('.search-results').empty()
    console.log('patent data', results)
    for (let i = 0; i < results.results.length; i++) {
      const singleSearchResult = patentsTemplate(results.results[i])
      $('.search-results').append(singleSearchResult)
    }
  })
}

const searchSoundsApi = function () {
  const searchText = $('#search-box').val()
  const data = {
    search: {
      query: searchText
    }
  }
  const soundUrl = 'http://localhost:4741/search/sounds'
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: `${soundUrl}`,
    method: 'POST',
    data: data
  }).done(function (results) {
    $('.search-results').empty()
    console.log('sound results', results)
    for (let i = 0; i < results.results.length; i++) {
      const singleSearchResult = soundsTemplate(results.results[i])
      $('.search-results').append(singleSearchResult)
    }
  })
}

const neoDailyFeed = function () {
  const neoUrl = 'http://localhost:4741/search/neo/today'
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: `${neoUrl}`,
    method: 'POST'
  }).done(function (results) {
    $('.neo-results').empty()
    console.log('neo results', results)
    const neoResults = neoTemplate(results)
    $('.neo').append(neoResults)
  })
}

const neoStats = function () {
  const neoUrl = 'http://localhost:4741/search/stats'
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: `${neoUrl}`,
    method: 'POST'
  }).done(function (results) {
    $('.neo-results').empty()
    console.log('neo results', results)
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
  const marsUrl = 'http://localhost:4741/search/mars'
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: `${marsUrl}`,
    method: 'POST',
    data: data
  }).done(function (results) {
    console.log('mars', results)
    $('.search-results').empty()
    for (let i = 0; i < results.photos.length; i++) {
      const singleSearchResult = marsTemplate(results.photos[i])
      $('.search-results').append(singleSearchResult)
    }
  })
}

const searchApod = function () {
  const apodDate = $('#apod-date').val()
  const data = {
    search: {
      query: apodDate
    }
  }
  const apodUrl = 'http://localhost:4741/search/apod'
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: `${apodUrl}`,
    method: 'POST',
    data: data
  }).done(function (results) {
    console.log('apod', results)
    $('.apod-results').empty()
    // for (let i = 0; i < results.photos.length; i++) {
    const apodResult = apodTemplate(results)
    $('.apod-results').append(apodResult)
    $('.add-picture').on('submit', function (event) {
      if (event && event.preventDefault) {
        event.preventDefault()
      }
      const data = getFormFields(event.target)
      console.log('favortie picture data is', data)
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
  // $('#apod-link').on('click', neoDailyFeed)
  $('.search-by-date').on('click', searchMarsRoverApi)
  $('#apod-link').on('click', showApod)
  $('.apod-search').on('click', searchApod)
}

module.exports = {
  addHandlers,
  neoDailyFeed,
  neoStats
}
