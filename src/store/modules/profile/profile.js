import axios from 'axios'
import { FETCH_PROFILE, FETCH_PROFILE_INFO } from '../../../api/api.js'

const state = {
  user: {
    email: '',
    id: '',
    fullname: '',
    profileimage: '',
    backgroundimage: '',
    profileUrl: ''
  },
  info: {
    totalFriends: '',
    friends: []
  },
  relationship: {
    isFriend: false,
    isStranger: false,
    isSelf: false
  }
}

const getters = {
  getBackgroundImage: (state) => {
    return state.user.backgroundimage
  },
  getProfileImage: (state) => {
    return state.user.profileimage
  },
  getFullname: (state) => {
    return state.user.fullname
  },
  isSelf: (state) => {
    return state.relationship.isSelf
  },
  isFriend: (state) => {
    return state.relationship.isFriend
  },
  isStranger: (state) => {
    return state.relationship.isStranger
  },
  getTotalFriends: (state) => {
    return state.info.totalFriends
  },
  getFriends: (state) => {
    return state.info.friends
  },
  getUserId: (state) => {
    return state.user.id
  }
}

const mutations = {
  setProfile: (state, user) => {
    state.user.id = user.id
    state.user.fullname = user.fullname
    state.user.backgroundimage = user.backgroundimage
    state.user.profileimage = user.profileimage
    state.user.email = user.email
    state.user.profileUrl = user.profileUrl
  },
  setRelationShip: (state, relationship) => {
    state.relationship.isFriend = relationship.isFriend
    state.relationship.isStranger = relationship.isStranger
    state.relationship.isSelf = relationship.isSelf
  },
  setProfileInfo: (state, info) => {
    state.info.totalFriends = info.total_friends
    state.info.friends = info.friends
  }
}

const actions = {
  fetchProfileVisited: (context, payload) => {
    axios({
      method: 'get',
      baseURL: FETCH_PROFILE,
      params: {
        profileUrl: payload
      },
      withCredentials: true
    }).then((response) => {
      if (response.data.status_code === 'ok') {
        context.commit('setProfile', response.data.user)
        context.commit('setRelationShip', response.data.relationShip)
        context.dispatch('fetchProfileInfo', response.data.user)
      }
    }).catch(() => {
      alert('Có lỗi xảy ra. Xin vui lòng thử lại')
    })
  },
  fetchProfileInfo: (context, payload) => {
    axios({
      method: 'get',
      baseURL: FETCH_PROFILE_INFO,
      params: {
        id: payload.id
      },
      withCredentials: true
    }).then((response) => {
      if (response.data.status_code === 'ok') {
        context.commit('setProfileInfo', response.data.data)
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
