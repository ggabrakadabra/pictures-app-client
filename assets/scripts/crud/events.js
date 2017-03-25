'use strict'

// const api = require('./api')
// const ui = require('./ui')
// const getFormFields = require('../../../lib/get-form-fields.js')
// const store = require('../store')
// const apodTemplate = require('../templates/apod.handlebars')

// const searchMovieApi = function() {
//   let searchText = $("#search-box").val();
//   let v3ApiKey = "e18ddcf3507daa19535e7842e7a62270";
//   let movieUrl = "https://api.themoviedb.org/3/search/movie?";
//   $.ajax({
//     url: `${movieUrl}api_key=${v3ApiKey}&language=en-US&query=${searchText}`,
//     method: 'GET',
//   }).done(function(results) {
//     $('.search-results').empty();
//     for (let i = 0; i < results.results.length; i++) {
//       let singleSearchResult = showMovieTemplate(results.results[i]);
//       $('.search-results').append(singleSearchResult);
//     }

const showApod = function () {
  const apiKey = 'T9Rfu2Fl6lIsh6xAlOGq3fKH9q29wtvjvjy1d8la'
  const apodUrl = 'https://api.nasa.gov/planetary/apod?'
  $.ajax({
    url: `${apodUrl}api_key=${apiKey}`,
    method: 'GET'
  }).then(function (results) {
    console.log(results)
    $('.search-results').empty()
        // for (let i = 0; i < results.results.length; i++) {
        //   let apodResult = apodTemplate(results.results[i]);
        //   $('.search-results').append();
        // }
  })
}

const addHandlers = () => {
  $('.search-results').on('', showApod)
};

module.exports = {
  showApod,
  addHandlers
}
