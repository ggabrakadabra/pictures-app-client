'use strict'

const api = require('./api')
const ui = require('./ui')
const showCommentTemplate = require('../templates/comment.handlebars')
const showFavoriteTemplate = require('../templates/favorite.handlebars')
const selectedPictureTemplate = require('../templates/selectedpicture.handlebars')

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

// const selectPicture = function(event) {
//   //want to show picture details in right hand pane
//   window.pictureId = $(event.currentTarget).attr('picture-id');
//   window.photo = $(event.currentTarget).attr('picture-photo');
//   window.currentTitle = $(event.currentTarget).attr('picture-title');
//   window.currentDescription = $(event.currentTarget).attr('picture-description');
//   $('.comments-list').empty();
//   showPictureAndComments(window.pictureId);
//   //for every comment, if the title of the picture is the one selected
//   //then append it to the right hand pane
//   //otherwise ignore it
//   $('.picture-favorite').removeClass('selected');
//   $(event.currentTarget).addClass('selected');
//   $('.comments-list').show();
// };

const showPictureAndComments = function () {
  api.showComments().done(function (response) {
    $('.comments-list').empty()
    console.log('Resposne is',response)
    $('.comments-list').append(selectedPictureTemplate({title:window.currentTitle, id:window.pictureId, description:window.currentDescription, photo:window.photo}));
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
        api.addComment(data)
          .done(showPictureAndComments)
          .done(ui.addCommentSuccess)
          .fail(ui.addCommentFailure)
      })
    $('.delete-comment').on('click', function (event) {
      const commentId = $(event.currentTarget).attr('comment-id')
      api.deleteComment(null, commentId)
        .done(showPictureAndComments)
        .done(ui.deleteCommentSuccess)
        .fail(ui.deleteCommentFailure)
    })
    $('.change-comment').on('submit', function (event) {
      if (event && event.preventDefault) {
        event.preventDefault()
      }
      const data = getFormFields(event.target)
      api.updateComment(data)
          .done(showPictureAndComments)
          .done(ui.updateCommentSucces)
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
    .done(function (response) {
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
          .done(showPictureAndComments)
          .done(onShowFavorites)
          .done(ui.deleteFavoriteSuccess)
          .fail(ui.deleteFavoriteFailure)
      })
    })
    .fail(ui.fail)
}

const showMyPictures = function () {
  $('#my-pictures-link').addClass('active')
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
  $('.picture-container').hide()

  onShowFavorites()
}

// show search bar and hide favorites
const showSearchBar = function() {
  $('#search-bar-link').addClass('active')
  $('.search-container').show()
  $('.picture-container').show()
  $('#my-pictures-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#sign-out-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('.comment-container').hide()
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
  $('#search-bar-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#sign-out-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('.comment-container').hide()
  $('.favorites-container').hide()
  $('.search-container').hide()
  $('.change-password-container').hide()
  $('.picture-container').hide()
}

// show change password
const showChangePassword = function () {
  $('#change-password-link').addClass('active')
  $('.change-password-container').show()
  $('#my-pictures-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('#comments-link').removeClass('active')
  $('.sign-in-container').hide()
  $('.favorites-container').hide()
  $('.search-container').hide()
  $('.comment-container').hide()
  $('.picture-container').hide()
}

const showComments = function () {
  $('#comments-link').addClass('active')
  $('.comment-container').show()
  $('#sign-out-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#my-pictures-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('#sign-in-link').removeClass('active')
  $('.sign-in-container').hide()
  $('.favorites-container').hide()
  $('.search-container').hide()
  $('.change-password-container').hide()
  $('.picture-container').hide()
}

const addHandlers = () => {
  $('#saved-pictures').on('click', onShowPictures)
  $('#my-pictures-link').on('click', showMyPictures)
  $('#show-favorites').on('click', onShowFavorites)
  // $('#saved-pictures').on('click', onShowPictures);
  // $('#search-box').on('keypress', searchPictureApi)
  // $('#search-box').on('keypress', searchGameApi)
  // $('#add-favorite').on('submit', onAddToFavoritesList)
  // $('#create-picture').on('submit', onCreatePictures)
  // $('#my-pictures-link').on('click', showMyPictures)
  $('#search-bar-link').on('click', showSearchBar)
  $('#sign-in-link').on('click', showSignIn)
  $('#change-password-link').on('click', showChangePassword)
  $('#comments-link').on('click', showComments)
}

module.exports = {
  addHandlers
}
