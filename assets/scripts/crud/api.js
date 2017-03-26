'use strict'

const config = require('../config')
const store = require('../store')

const createPictures = function (data) {
  console.log('api data', data)
  return $.ajax({
    url: config.apiOrigin + '/pictures',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data
  })
}

const showPictures = function () {
  return $.ajax({
    url: config.apiOrigin + '/pictures',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const addComment = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/comments',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data
  })
}

const showComments = function () {
  return $.ajax({
    url: config.apiOrigin + '/comments',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const updateComment = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/comments/' + data.comment.id,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data
  })
}

const showFavorites = function () {
  return $.ajax({
    url: config.apiOrigin + '/favorites',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const addToFavoritesList = function (data) {
  const favoriteParams = {
    'favorite': {
      'picture_id': data.picture.id.toString()
    }
  }
  console.log('api data', data)
  return $.ajax({
    url: config.apiOrigin + '/favorites',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    data: favoriteParams
  })
}

const deleteFavorite = function (id) {
  return $.ajax({
    url: `${config.apiOrigin}/favorites/` + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

const deleteComment = function (data, id) {
  return $.ajax({
    url: `${config.apiOrigin}/comments/` + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`
    }
  })
}

module.exports = {
  addToFavoritesList,
  createPictures,
  addComment,
  showPictures,
  showComments,
  showFavorites,
  deleteFavorite,
  deleteComment,
  updateComment
}
