import axios from 'axios'
import { NETWORK_GOAL, GET_NETWORK, GET_NETWORK_PROFILE } from '../../../api/api.js'

const state = {
  goals: [],
  numberOffset: 0,
  sportNetwork: [],
  languageNetwork: [],
  allNetworks: [],
  userAccount: {},
  // this is the profile of user when you visite his/her profile
  networkProfileVisiting: undefined
}

const getters = {
  getGoals: (state) => {
    return state.goals
  },
  getAllNetworks: (state) => {
    return state.allNetworks
  },
  getUserAccount: (state) => {
    return state.userAccount
  },
  getNetworkProfileVisiting: (state) => {
    return state.networkProfileVisiting
  }
}

const mutations = {
  setGoal: (state, payload) => {
    payload.forEach(e => {
      state.goals.push({
        goal: e.goal,
        selectGoal: e.select_goal,
        introduction: e.introduction
      })
    })
  },
  setAllNetworks: (state, payload) => {
    state.allNetworks = [...state.allNetworks, ...payload]
  },
  setUserAccount: (state, payload) => {
    state.userAccount = payload
  },
  setNetworkProfileVisiting: (state, payload) => {
    state.networkProfileVisiting = payload.user
  }
}

const actions = {
  fetchGoals: (context, payload) => {
    axios({
      method: 'GET',
      baseURL: NETWORK_GOAL,
      withCredentials: true
    }).then((response) => {
      var data = JSON.parse(response.data.replace('while(1);', ''))
      if (data.status_code === 'ok') {
        context.commit('setGoal', data.goal)
      }
    })
  },
  // JsonResponse
  fetchNetwork: (context, payload) => {
    var data = {
      tab_section: 'all',
      number_offset: context.state.numberOffset
    }
    axios({
      method: 'GET',
      baseURL: GET_NETWORK,
      withCredentials: true,
      params: data
    }).then(response => {
      if (response.data.status_code === 'ok') {
        context.commit('setAllNetworks', response.data.data)
      }
    })
  },
  getNetworkProfileVisiting: (context, payload) => {
    var data = {
      network_id: payload
    }
    axios({
      method: 'GET',
      baseURL: GET_NETWORK_PROFILE,
      withCredentials: true,
      params: data
    }).then(response => {
      var res = JSON.parse(response.data.replace('while(1);', ''))
      if (res.status_code === 'ok') {
        let payload = {
          user: res.user
        }
        context.commit('setNetworkProfileVisiting', payload)
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
