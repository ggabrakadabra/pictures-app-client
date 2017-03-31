'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')
const store = require('../store')

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then((response) => {
      store.user = response.user
      window.loggedInUserId = response.user.id
      return store.user
    })
    .then(ui.signInSuccess)
    .fail(ui.SignInFailure)
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(() => {
      onSignIn(event, data)
    })
    .then(ui.signUpSuccess)
    .fail(ui.SignInFailure)
    .then(ui)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signOut(data)
 .then(ui.signOutSuccess)
 .fail(ui.failure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
 .then(ui.changePasswordSuccess)
 .fail(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
