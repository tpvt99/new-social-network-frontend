import axios from 'axios'
import { FETCH_STATUS, FETCH_STATUS_PROFILE } from '../../../api/api.js'

const state = {
  allStatus: []
}

const getters = {
  getAll: (state) => {
    return state.allStatus
  }
}

const mutations = {
  setStatus: (state, payload) => {
    state.allStatus.push(payload)
  },
  prependStatus: (state, payload) => {
    state.allStatus.splice(0, 0, payload)
  },
  prependComment: (state, payload) => {
    state.allStatus.forEach(function (stat) {
      if (stat.id === payload.feedPk) {
        payload.comments.forEach(function (c) {
          stat.comments.splice(0, 0, c)
        })
      }
    })
  },
  appendComment: (state, payload) => {
    state.allStatus.forEach(function (stat) {
      if (stat.id === payload.feedPk) {
        payload.comments.forEach(function (c) {
          stat.comments.push(c)
        })
      }
    })
  },
  adjustUserVote: (state, payload) => {
    for (let stat of state.allStatus) {
      if (stat.id === payload.statusId) {
        for (let react of stat.reactions) {
          if (react.reactionType === payload.reactionType) {
            if (payload.data.been_vote === true) {
              react.votes += 1
              react.userVotes.push(payload.data.user)
            } else {
              react.votes -= 1
              react.userVotes = react.userVotes.filter((e) => {
                return e.user.id !== payload.data.user.user.id
              })
            }
          }
        }
        break
      }
    }
  },
  adjustPlustagUserVote: (state, payload) => {
    for (let stat of state.allStatus) {
      if (stat.id === payload.feedPk) {
        for (let plustag of stat.plustags) {
          if (plustag.id === payload.plustagPk) {
            plustag.uservotes = payload.payload
            plustag.votes = 1 + plustag.uservotes.length
            break
          }
        }
        break
      }
    }
  },
  plustagComment: (state, payload) => {
    for (let stat of state.allStatus) {
      if (stat.id === payload.feedPk) {
        stat.plustags = payload.plustags
        break
      }
    }
  },
  plustagDelete: (state, payload) => {
    for (let stat of state.allStatus) {
      if (stat.id === payload.feedPk) {
        stat.plustags = stat.plustags.filter(function (e) {
          if (e.id === payload.plustagPk) return false
          return true
        })
        break
      }
    }
  },
  sortPlusTags: (state, payload) => {
    function compare (a, b) {
      if (a.votes < b.votes) return 1
      if (a.votes > b.votes) return -1
      return 0
    }
    for (let stat of state.allStatus) {
      if (stat.id === payload.feedPk) {
        stat.plustags.sort(compare)
        break
      }
    }
  }
}

const actions = {
  fetchStatus: (context, payload) => {
    let data = {
      tab_section: payload.tab_section,
      currentIndex: context.state.allStatus.length
    }
    axios({
      method: 'get',
      baseURL: FETCH_STATUS,
      params: data,
      withCredentials: true
    }).then(function (data) {
      if (data.data.status_code === 'ok') {
        data.data.data.forEach((x) => {
          context.commit('setStatus', x)
        })
      }
    })
  },
  fetchStatusProfile: (context, profileUrl) => {
    axios({
      method: 'get',
      baseURL: FETCH_STATUS_PROFILE,
      params: {
        currentIndex: context.state.allStatus.length,
        profileUrl: profileUrl
      },
      withCredentials: true
    }).then(function (data) {
      if (data.data.status_code === 'ok') {
        data.data.data.forEach((x) => {
          context.commit('setStatus', x)
        })
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
