'use strict'

const events = require('../api/events.js')

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

$('#mars-rover-link').hide()
$('.mars-rover-container').hide()
$('#my-pictures-link').hide()
$('#apod-link').hide()
$('.apod-container').hide()
$('#change-password-link').hide()
$('#sign-out-link').hide()
$('#comments-link').hide()
$('#sign-out').hide()
$('#search-bar-link').hide()

const signInSuccess = function () {
  $('.message').text('Sign In Successful!')
  $('#sign-in')[0].reset()
  $('#mars-rover-link').show()
  $('.mars-rover-container').show()
  $('#apod-link').addClass('active')
  $('#mars-rover-link').removeClass('active')
  $('#change-password-link').removeClass('active')
  $('#my-pictures-link').removeClass('active')
  $('#search-bar-link').removeClass('active')
  $('.apod-container').show()
  $('.search-apod').show()
  $('.apod-results').show()
  $('#sign-in-link').hide()
  $('.sign-in-container').hide()
  $('.search-container').hide()
  $('#my-pictures-link').show()
  $('#apod-link').show()
  $('#search-bar-link').show()
  $('#change-password-link').show()
  $('#sign-out-link').show()
  $('#comments-link').show()
  $('#change-password').show()
  $('#sign-out').show()
  $('.comment-container').show()
  $('.favorite-container').show()
  $('.picture-container').show()
  $('#mars-search-results').hide()
  $('.mars-rover-container').hide()
  // $('.search-message').show()

  events.neoDailyFeed()
  events.neoStats()
  events.showApod()
}

const signUpSuccess = function () {
  $('.message').text('Sign Up Successful!')
  $('#sign-up')[0].reset()
  $('#sign-in')[0].reset()
  $('#sign-up')[0].reset()
}

const changePasswordSuccess = function () {
  $('.message').text('Changed Password!!')
  $('#change-password')[0].reset()
}

const signOutSuccess = function () {
  $('#sign-up')[0].reset()
  $('#earth-date').val('')
  $('#apod-date').val('')
  $('#mars-rover-link').hide()
  $('#mars-rover-link').removeClass('active')
  $('#change-password')[0].reset()
  $('.mars-rover-container').hide()
  $('.message').text('Sign Out Successful!')
  $('#sign-in-link').addClass('active')
  $('.sign-in-container').show()
  $('#my-pictures-link').hide()
  $('#apod-link').hide()
  $('#change-password-link').hide()
  $('#sign-out-link').hide()
  $('#comments-link').hide()
  $('#pictures-results').empty()
  $('.comment-results').empty()
  $('.favorite-results').empty()
  $('.search-results').empty()
  $('#mars-search-results').empty()
  $('#sign-out').hide()
  $('#change-password-link').hide()
  $('.change-password-container').hide()
  $('#sign-in-link').show()
  $('.search-container').hide()
  $('.sign-in-container').show()
  $('#sign-up').show()
  $('.apod-container').hide()
  $('.change-password-container').hide()
  $('.picture-container').hide()
  $('.comment-container').hide()
  $('.favorites-container').hide()
  $('#search-box').val('')
  $('.comments-list').empty()
  $('#search-bar-link').hide()
  $('.neo').empty()
  $('.neo-stats').empty()
  $('.mars-rover-container').hide()
  $('.search-mars').hide()
}

module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
  changePasswordFailure,
  signUpSuccess,
  SignInFailure,
  changePasswordSuccess
}
