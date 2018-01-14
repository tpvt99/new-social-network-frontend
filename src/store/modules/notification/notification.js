import axios from 'axios'
import { FETCH_NOTIFICATION } from '../../../api/api.js'

const state = {
  allNotification: [],
  unread: ''
}

const getters = {
  getAllNoti: (state) => {
    return state.allNotification
  },
  getUnreadNoti: (state) => {
    return state.unread
  }
}

const mutations = {
  setNoti: (state, payload) => {
    state.allNotification.push(payload)
  },
  setUnreadNoti: (state, payload) => {
    state.unread = payload
  }
}

const actions = {
  fetchNotification: (context) => {
    axios({
      method: 'get',
      baseURL: FETCH_NOTIFICATION,
      params: {
        currentIndex: context.state.allNotification.length
      },
      withCredentials: true
    }).then(function (response) {
      if (response.data.status_code === 'ok') {
        response.data.data.forEach((e) => {
          context.commit('setNoti', e)
        })
        context.commit('setUnreadNoti', response.data.unread)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
