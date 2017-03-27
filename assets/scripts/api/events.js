'use strict'
const marsTemplate = require('../templates/marsrover.handlebars')
// const showSoundsTemplate = require('../templates/sounds.handlebars')
const apodTemplate = require('../templates/apod.handlebars')
const neoTemplate = require('../templates/neo.handlebars')

const showApod = function () {
  const apiKey = 'T9Rfu2Fl6lIsh6xAlOGq3fKH9q29wtvjvjy1d8la'
  const apodUrl = 'https://api.nasa.gov/planetary/apod?'
  $.ajax({
    url: `${apodUrl}api_key=${apiKey}`,
    method: 'GET'
  }).then(function(results) {
    console.log('apod', results)
    $('.apod-results').empty()
    const apodResult = apodTemplate(results)
    $('.apod-results').append(apodResult)
    $('.apod-results').on('click', function (event) {
      event.preventDefault()
      console.log('event', event.currentTarget)
      const data = {
        picture: {
          title: event.currentTarget.children[0],
          description: event.currentTarget.children[1],
          photo: event.currentTarget.children[1].children[0]
        }
      }
      //   api.createPictures(data)
      //     .then(ui.savedPicture)
      //     .fail(ui.fail)
      //     .then(api.addToFavoritesList)
      //     .then(ui.addPictureToFavorites)
      //     .fail(ui.addFavoriteFail)
      // })
      console.log('data is', data)
    })
  })
}
// $('.apod-results').on('click', function (event, data) {
//   event.preventDefault()
//   api.createPictures(data)
//     .then(ui.savedPicture)
//     .fail(ui.fail)
//     .then(api.addToFavoritesList)
//     .then(ui.addPictureToFavorites)
//     .fail(ui.addFavoriteFail)
// })

const searchPatentsApi = function() {
  const searchText = $('#search-box').val()
  const apiKey = 'T9Rfu2Fl6lIsh6xAlOGq3fKH9q29wtvjvjy1d8la'
  const patentUrl = 'https://api.nasa.gov/patents/content?'
  $.ajax({
    url: `${patentUrl}query=${searchText}&api_key=${apiKey}`,
    dataType: 'JSONP',
    // crossDomain: true,
    jsonp: 'json_callback',
    method: 'GET',
    success: function(data) {
      console.log('patent data', data)
      $('.search-results').empty()
      // for (let i = 0; i < results.results.length; i++) {
      //   let singleSearchResult = showMovieTemplate(results.results[i]);
      //   $('.search-results').append(singleSearchResult);
      // }
    }
  })
}

const searchSoundsApi = function() {
  const searchText = $('#search-box').val()
  const apiKey = 'T9Rfu2Fl6lIsh6xAlOGq3fKH9q29wtvjvjy1d8la'
  const soundUrl = 'https://api.nasa.gov/planetary/sounds'
  $.ajax({
    url: `${soundUrl}?q=${searchText}&api_key=${apiKey}`,
    dataType: 'JSONP',
    // crossDomain: true,
    // data: dataString,
    jsonp: 'json_callback',
    method: 'GET'
  })
  // .then(function (results) {
  //   console.log('sound results')
  //     // for (let i = 0; i < result.results.length; i++) {
  //     //   const singleSearchResult = showSoundsTemplate(result.results[i])
  //     //   $('.single-search-result-sounds').append(singleSearchResult)
  //     // }
  // })
}

const neoDailyFeed = function() {
  const apiKey = 'T9Rfu2Fl6lIsh6xAlOGq3fKH9q29wtvjvjy1d8la'
  const neoUrl = 'https://api.nasa.gov/neo/rest/v1/feed/today?'
  $.ajax({
    url: `${neoUrl}detailed=true&api_key=${apiKey}`,
    method: 'GET'
  }).then(function(results) {
    $('.neo-results').empty()
    console.log('neo results', results)
    const neoResults = neoTemplate(results)
    $('.neo-results').append(neoResults)
  })
}

const searchMarsRoverApi = function() {
  const earthDate = $('#earth-date').val()
  const apiKey = 'T9Rfu2Fl6lIsh6xAlOGq3fKH9q29wtvjvjy1d8la'
  const marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?'
  $.ajax({
    url: `${marsUrl}earth_date=${earthDate}&api_key=${apiKey}`,
    method: 'GET'
  }).then(function(results) {
    console.log('mars', results)
    $('.mars-search-results').empty()
    for (let i = 0; i < results.photos.length; i++) {
      const singleSearchResult = marsTemplate(results.photos[i])
      $('.mars-search-results').append(singleSearchResult)
    }
  })
}

// const showEarthImagery = function () {
//   const apiKey = 'T9Rfu2Fl6lIsh6xAlOGq3fKH9q29wtvjvjy1d8la'
//   const searchDate = $('#epic-search-date').val()
//   const earthUrl = 'https://api.nasa.gov/planetary/earth/imagery?'
//   $.ajax({
//     url: `${earthUrl}lon=100.75&lat=1.5&date=${searchDate}&cloud_score=True&api_key=${apiKey}`,
//     method: 'GET'
//   }).then(function (response) {
//     console.log('epic response', response)
//     for (let i = 0; i < response.length; i++) {
//       const singleSearchResult = epicTemplate(response)
//       $('.epic-results').append(singleSearchResult)
//     }
//   })
// }

const addHandlers = () => {
  // $('#saved-pictures').on('click', onShowPictures);
  $('.patents-search').on('click', searchPatentsApi)
  $('.sounds-search').on('click', searchSoundsApi)
  $('#apod-link').on('click', neoDailyFeed)
  $('.search-by-date').on('click', searchMarsRoverApi)
  $('#apod-link').on('click', showApod)
}

module.exports = {
  addHandlers
}