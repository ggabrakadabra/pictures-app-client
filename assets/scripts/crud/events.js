'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const showCommentTemplate = require('../templates/comment.handlebars')
const showFavoriteTemplate = require('../templates/favorite.handlebars')
const selectedPictureTemplate = require('../templates/selectedpicture.handlebars')

// const store = require('../store')

// const onCreatePictures = function(event) {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   api.createPictures(data)
//     .then((response) => {
//       store.picture = response.picture
//       return store.picture
//     })
//     .then(ui.success)
//     .fail(ui.failure)
// }

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

const showPictureAndComments = function () {
  api.showComments().then(function (response) {
    $('.comments-list').empty()
    $('.comments-list').append(selectedPictureTemplate({ title: window.currentTitle, id: window.pictureId, description: window.currentDescription, photo: window.photo }))
    for (let i = 0; i < response.comments.length; i++) {
      const comment = showCommentTemplate(response.comments[i])
      const commentPictureId = response.comments[i].picture.id
      if (commentPictureId == window.pictureId) {
        $('.comments-list').append(comment)
      }
    }
    $('#create-comment').on('submit', function (event) {
      if (event && event.preventDefault) {
        event.preventDefault()
      }
      const data = getFormFields(event.target)
      console.log('data is', data)
      api.addComment(data)
        .then(showPictureAndComments)
        .then(ui.addCommentSuccess)
        .fail(ui.addCommentFailure)
    })
    $('.delete-comment').on('click', function (event) {
      const commentId = $(event.currentTarget).attr('comment-id')
      api.deleteComment(null, commentId)
        .then(showPictureAndComments)
        .then(ui.deleteCommentSuccess)
        .fail(ui.deleteCommentFailure)
    })
    $('.change-comment').on('submit', function (event) {
      if (event && event.preventDefault) {
        event.preventDefault()
      }
      const data = getFormFields(event.target)
      api.updateComment(data)
          .then(showPictureAndComments)
          .then(ui.updateCommentSucces)
          .fail(ui.updateCommentFailure)
    })
    $('.comment').on('mouseover', function (event) {
      // when user hovers over comment, show update comment for users comment only if the user is the author of the comment
      const authorId = $(event.currentTarget).attr('author-id')
      if (window.loggedInUserId == authorId) {
        $('.change-comment').hide()
        $(event.currentTarget).find('.change-comment').show()
      }
    })
    $('.comment').on('mouseout', function (event) {
      $(event.currentTarget).find('.change-comment').hide()
    })
  })
}

const selectPicture = function (event) {
  // want to show picture details in right hand pane
  window.pictureId = $(event.currentTarget).attr('picture-id')
  window.photo = $(event.currentTarget).attr('picture-photo')
  window.currentTitle = $(event.currentTarget).attr('picture-title')
  window.currentDescription = $(event.currentTarget).attr('picture-description')
  $('.comments-list').empty()
  showPictureAndComments(window.pictureId)
  // for every comment, if the title of the picture is the one selected
  // then append it to the right hand pane
  // otherwise ignore it
  $('.picture-favorite').removeClass('selected')
  $(event.currentTarget).addClass('selected')
  $('.comments-list').show()
}

const onShowFavorites = function (event) {
  if (event && event.preventDefault) {
    event.preventDefault()
  }
  api.showFavorites()
    .then(function (response) {
      $('.favorites-list').empty()
      console.log(response)
      for (let i = 0; i < response.favorites.length; i++) {
        const favorite = showFavoriteTemplate(response.favorites[i])
        $('.favorites-list').append(favorite)
      }
      $('.picture-favorite').on('click', selectPicture)
      $('.delete-favorite').on('click', function (event) {
        event.preventDefault()
        const favoriteId = $(event.currentTarget).attr('favorite-id')
        api.deleteFavorite(favoriteId)
          .then(showPictureAndComments)
          .then(onShowFavorites)
          .then(ui.deleteFavoriteSuccess)
          .fail(ui.deleteFavoriteFailure)
      })
    })
    .fail(ui.fail)
}

const savePictureToFavorites = function (event) {
  event.preventDefault()
  const data = {
    picture: {
      title: event.currentTarget.title,
      description: event.currentTarget.explanation,
      photo: event.currentTarget.hdurl
    }
  }
  api.createPictures(data)
  console.log('cata is', data)
    .then(ui.savedPicture)
    .fail(ui.fail)
    .then(api.addToFavoritesList)
    .then(ui.addPictureToFavorites)
    .fail(ui.addFavoriteFail)
}

const showMyPictures = function () {
  $('#my-pictures-link').addClass('active')
  $('.favorites-container').show()
  $('.delete-favorite').show()
  $('#apod-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('#sign-out-link').removeClass('active')
  $('.comment-container').hide()
  $('.search-container').hide()
  $('.apod-container').hide()
  $('.sign-in-container').hide()
  $('.change-password-container').hide()
  $('.picture-container').hide()

  onShowFavorites()
}

// show search bar and hide favorites
const showApodContainer = function () {
  $('#apod-link').addClass('active')
  $('.apod-container').show()
  $('.picture-container').show()
  $('#my-pictures-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#sign-out-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('.comment-container').hide()
  $('.search-container').hide()
  $('.favorites-container').hide()
  $('.sign-in-container').hide()
  $('.change-password-container').hide()
  $('.comment-container').hide()
}

// show sign in
const showSignIn = function () {
  $('#sign-in-link').addClass('active')
  $('.sign-in-container').show()
  $('#my-pictures-link').removeClass('active')
  $('#apod-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('#sign-out-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('.comment-container').hide()
  $('.favorites-container').hide()
  $('.search-container').hide()
  $('.apod-container').hide()
  $('.change-password-container').hide()
  $('.picture-container').hide()
}

// show change password
const showChangePassword = function () {
  $('#change-password-link').addClass('active')
  $('.change-password-container').show()
  $('#my-pictures-link').removeClass('active')
  $('#apod-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('.sign-in-container').hide()
  $('.favorites-container').hide()
  $('.apod-container').hide()
  $('.comment-container').hide()
  $('.search-container').hide()
  $('.picture-container').hide()
}

const showComments = function () {
  $('#comments-link').addClass('active')
  $('.comment-container').show()
  $('#sign-out-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#my-pictures-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('#apod-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('.sign-in-container').hide()
  $('.favorites-container').hide()
  $('.apod-container').hide()
  $('.search-container').hide()
  $('.change-password-container').hide()
  $('.picture-container').hide()
}

const showSearchBar = function () {
  $('#search-bar-link').addClass('active')
  $('.search-container').show()
  $('.movie-container').show()
  $('#my-pictures-link').removeClass('active')
  $('#apod-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#sign-out-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('.comment-container').hide()
  $('.apod-container').hide()
  $('.favorites-container').hide()
  $('.sign-in-container').hide()
  $('.change-password-container').hide()
  $('.comment-container').hide()
}

const addHandlers = () => {
  $('#saved-pictures').on('click', onShowPictures)
  $('#save-apod').on('submit', savePictureToFavorites)
  $('#my-pictures-link').on('click', showMyPictures)
  $('#show-favorites').on('click', onShowFavorites)
  // $('#saved-pictures').on('click', onShowPictures);
  // $('.show-epic-photos').on('click', showEarthImagery)
  // $('#search-box').on('keypress', searchGameApi)
  // $('#add-favorite').on('submit', onAddToFavoritesList)
  // $('#create-picture').on('submit', onCreatePictures)
  // $('#my-pictures-link').on('click', showMyPictures)
  $('#apod-link').on('click', showApodContainer)
  $('#sign-in-link').on('click', showSignIn)
  $('#change-password-link').on('click', showChangePassword)
  $('#comments-link').on('click', showComments)
  $('#search-bar-link').on('click', showSearchBar)
  // $('#show-apod').on('click', showApod)
}

module.exports = {
  addHandlers
}
