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
    if (results.count == 0) {
      $('.message').text('No Results')
    } else if (results.count > 0) {
      for (let i = 0; i < results.results.length; i++) {
        const singleSearchResult = patentsTemplate(results.results[i])
        $('.search-results').append(singleSearchResult)
      }
      apiUi.searchPatentsSuccess()
    }
    $('#search-box').val('')
  })
}

const searchSoundsApi = function () {
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/sounds',
    method: 'POST'
  }).done(function (results) {
    $('.search-results').empty()
    for (let i = 0; i < results.results.length; i++) {
      const singleSearchResult = soundsTemplate(results.results[i])
      $('.search-results').append(singleSearchResult)
    }
  })
  .then(apiUi.searchSoundsSuccess)
}

const searchSoundsApiByQuery = function () {
  const searchText = $('#sounds-search-box').val()
  const data = {
    search: {
      query: searchText
    }
  }
  $.ajax({
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    url: config.apiOrigin + '/search/sounds/query',
    method: 'POST',
    data: data
  }).done(function (results) {
    $('.search-results').empty()
    if (results.count == 0) {
      $('.message').text('No Results')
    } else if (results.count > 0) {
      for (let i = 0; i < results.results.length; i++) {
        const singleSearchResult = soundsTemplate(results.results[i])
        $('.search-results').append(singleSearchResult)
      }
      apiUi.searchSoundsSuccess()
    }
  })
  $('#sounds-search-box').val('')
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
      style: 'carousel',
      start: 0,
      keyboard: false,
      click: true,
      // nav: 'after',
      buttons: true,
      scrollwheel: false,
      fadeIn: 200,
      loop: true,
      // autoplay: 1500,
      spacing: -0.2
    })
    $('#mars-search-results').flipster('index')
    // $('.add-mars-picture').on('submit', function (event) {
    //   if (event && event.preventDefault) {
    //     event.preventDefault()
    //   }
    //   const data = getFormFields(event.target)
    //   api.createPictures(data)
    //       .then(api.addToFavoritesList)
    //       .then(ui.addPictureToFavorites)
    //       .fail(ui.addFavoriteFail)
    // })
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
    .then(ui.searchApodSuccess)
    .fail(ui.searchApodFail)
}

const addHandlers = () => {
  $('.patents-search').on('click', searchPatentsApi)
  $('.sounds-search').on('click', searchSoundsApi)
  $('.sounds-search-query').on('click', searchSoundsApiByQuery)
  $('.search-by-date').on('click', searchMarsRoverApi)
  $('#apod-link').on('click', showApod)
  $('.apod-search').on('click', searchApod)
}

module.exports = {
  addHandlers,
  neoDailyFeed,
  neoStats,
  showApod
}
