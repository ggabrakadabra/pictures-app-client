'use strict'

// const events = require('../crud/events.js')
// const api = require('./api')

const success = (data) => {
}

const failure = (error) => {
  $('.message').text('Error!!!')
}

const SignInFailure = function () {
  $('.message').text('Invalid Email or Password')
  $('#sign-in')[0].reset()
}

const changePasswordFailure = function () {
  $('.message').text('Invalid Password!')
  $('#change-password')[0].reset()
}

$('#my-pictures-link').hide();
$('#apod-link').hide();
$('#change-password-link').hide();
$('#sign-out-link').hide();
$('#comments-link').hide();
$('#sign-out').hide();

const signInSuccess = function () {
  $('.message').text('Sign In Successful!');
  $('#sign-in')[0].reset();
  $('#apod-link').addClass('active');
  $('#change-password-link').removeClass('active');
  $('#my-pictures-link').removeClass('active');
  $('.apod-container').show();
  $('#sign-in-link').hide();
  $('.sign-in-container').hide();
  $('#my-pictures-link').show();
  $('#apod-link').show();
  $('#change-password-link').show();
  $('#sign-out-link').show();
  $('#comments-link').show();
  $('#change-password').show();
  $('#sign-out').show();
  $('.comment-container').show();
  $('.favorite-container').show();
  $('.picture-container').show();
  $('.api-apod-container').show();

}

const signUpSuccess = function () {
  $('.message').text('Sign Up Successful!');
  $('#sign-up')[0].reset();
};

const changePasswordSuccess = function () {
  $('.message').text('Changed Password!!');
  $('#change-password')[0].reset();
}

const signOutSuccess = function () {
  $('.message').text('Sign Out Successful!');
  $('#sign-in-link').addClass('active');
  $('.sign-in-container').show();
  $('#my-pictures-link').hide();
  $('#apod-link').hide();
  $('#change-password-link').hide();
  $('#sign-out-link').hide();
  $('#comments-link').hide();
  $('#pictures-results').empty();
  $('.comment-results').empty();
  $('.favorite-results').empty();
  $('.search-results').empty();
  $('#sign-out').hide();
  $('#change-password-link').hide();
  $('.change-password-container').hide();
  $('#sign-in-link').show();
  $('.sign-in-container').show();
  $('#sign-up').show();
  $('.apod-container').hide();
  $('.change-password-container').hide();
  $('.picture-container').hide();
  $('.comment-container').hide();
  $('.favorites-container').hide();
  $('#search-box').val('');
  $('.comments-list').empty();
};

module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
  changePasswordFailure,
  signUpSuccess,
  SignInFailure,
  changePasswordSuccess
};
