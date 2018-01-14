import { CHECK_AUTHENTICATION } from '../../../api/api.js'
import axios from 'axios'
/* eslint-disable no-unused-vars */
import querystring from 'query-string'

const state = {
  user: {
    email: '',
    id: '',
    fullname: '',
    profileimage: '',
    backgroundimage: '',
    profileUrl: '',
    isMinimizedFeed: false
  },
  isAnonymous: true
}

const getters = {
  getAll: (state) => {
    return state
  },
  getUser: (state) => {
    return state.user
  },
  getFullname: (state) => {
    return state.user.fullname
  },
  getProfileImage: (state) => {
    return state.user.profileimage ? state.user.profileimage : '/static/image/user.jpeg'
  },
  getBackgroundImage: (state) => {
    return state.user.backgroundimage ? state.user.backgroundimage : ''
  },
  getEmail: (state) => {
    return state.user.email
  },
  getId: (state) => {
    return state.user.id
  },
  getProfileUrl: (state) => {
    return state.user.profileUrl
  },
  isAnonymous: (state) => {
    return state.isAnonymous
  },
  getMinimizedFeed: (state) => {
    return state.user.isMinimizedFeed
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user.id = user.id
    state.user.fullname = user.fullname
    state.user.backgroundimage = user.backgroundimage
    state.user.profileimage = user.profileimage
    state.user.email = user.email
    state.user.profileUrl = user.profileUrl
    state.user.isMinimizedFeed = false
    state.isAnonymous = false
  }
}

const actions = {
  checkAuthentication: (context, payload) => {
    axios({
      method: 'get',
      baseURL: CHECK_AUTHENTICATION,
      withCredentials: true
    }).then((response) => {
      var data = JSON.parse(response.data.replace('while(1);', ''))
      if (data.status_code === 'ok') {
        context.commit('setUser', data.user)
        if (payload && payload.resolve) {
          payload.resolve()
        }
      } else {
        if (payload && payload.reject) {
          payload.reject()
        }
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
