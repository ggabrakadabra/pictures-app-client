'use strict';

// const events = require('./events');

const success = (data) => {
  if (data) {
  }
};

const failure = (data) => {
  $('.message').text('Error!!!');
};

// const clearComments = () => {
//   $('.comments-list').empty();
// };

const savedPicture = function () {
  $('.message').text('Picture Added to Saved Pictures!')
}

const addPictureToFavorites = function () {
  $('.message').text('Picture Added to Favorites!')
}

const addFavoriteFail = function () {
  $('.message').text('Favorite Already Added!')
}

const addCommentSuccess = function () {
  $('.message').text('Comment Added to Picture!')
}

const addCommentFailure = function () {
  $('.message').text('Invalid Comment')
}

const deleteCommentSuccess = function () {
  $('.message').text('Removed Comment!')
}

const deleteCommentFailure = function () {
  $('.message').text('Invalid User')
}

const deleteFavoriteSuccess = function () {
  $('.message').text('Removed Favorite!')
  window.pictureId = null
  window.photo = null
  window.currentTitle = null
  window.currentDescription = null
  $('.comments-list').hide()

}

const deleteFavoriteFailure = function () {
  $('.message').text('Invalid Favorite ID')
}

const updateCommentSucces = function () {
  $('.message').text('Comment Updated!')
  $('.change-comment')[0].reset()
}

const updateCommentFailure = function () {
  $('.message').text('Invalid User')
  $('.change-comment')[0].reset()
}

module.exports = {
  success,
  failure,
  addCommentSuccess,
  deleteCommentFailure,
  updateCommentFailure,
  addFavoriteFail,
  deleteFavoriteFailure,
  deleteCommentSuccess,
  addCommentFailure,
  deleteFavoriteSuccess,
  updateCommentSucces,
  addPictureToFavorites,
  savedPicture
  // clearComments,
};
