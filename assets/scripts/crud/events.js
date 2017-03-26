'use strict'

const api = require('./api')
const ui = require('./ui')
const showFavoriteTemplate = require('../templates/favorite.handlebars')

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

// const selectMovie = function(event) {
//   //want to show movie details in right hand pane
//   window.movieId = $(event.currentTarget).attr('movie-id');
//   window.photo = $(event.currentTarget).attr('movie-photo');
//   window.currentTitle = $(event.currentTarget).attr('movie-title');
//   window.currentDescription = $(event.currentTarget).attr('movie-description');
//   $('.comments-list').empty();
//   showMovieAndComments(window.movieId);
//   //for every comment, if the title of the movie is the one selected
//   //then append it to the right hand pane
//   //otherwise ignore it
//   $('.movie-favorite').removeClass('selected');
//   $(event.currentTarget).addClass('selected');
//   $('.comments-list').show();
// };

const onShowFavorites = function(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  api.showFavorites()
    .done(function (response) {
      $('.favorites-list').empty()
      console.log(response)
      for (let i = 0; i < response.favorites.length; i++) {
        let favorite = showFavoriteTemplate(response.favorites[i])
        $('.favorites-list').append(favorite)
      }
      // $('.movie-favorite').on('click', selectPicture)
      $('.delete-favorite').on('click', function (event) {
        event.preventDefault()
        let favoriteId = $(event.currentTarget).attr('favorite-id')
        api.deleteFavorite(favoriteId)
          .done(showMovieAndComments)
          .done(onShowFavorites)
          .done(ui.deleteFavoriteSuccess)
          .fail(ui.deleteFavoriteFailure)
      })
    })
    .fail(ui.fail)
}

const showMyPictures = function() {
  $('#my-movies-link').addClass('active')
  $('.favorites-container').show()
  $('.delete-favorite').show()
  $('#search-bar-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('#sign-out-link').removeClass('active')
  $('.comment-container').hide()
  $('.search-container').hide()
  $('.sign-in-container').hide()
  $('.change-password-container').hide()
  $('.movie-container').hide()

  onShowFavorites()
}

const addHandlers = () => {
  $('#saved-pictures').on('click', onShowPictures)
  $('#my-pictures-link').on('click', showMyPictures)
}

module.exports = {
  addHandlers
}
