import axios from 'axios'
import { NETWORK_PEOPLE, NETWORK_FRAME, GET_NETWORK_MESSAGE, SEND_NETWORK_MESSAGE, PULL_NETWORK_MESSAGE } from '../../../api/api.js'
import querystring from 'query-string'
const state = {
  networkPeople: [],
  chatFrames: []
}

const getters = {
  getNetworkPeople: (state) => {
    return state.networkPeople
  },
  getChatFrames: (state) => {
    return state.chatFrames
  }
}

const mutations = {
  addChatFrame: (state, payload) => {
    var frame = {
      frameId: payload.frame_id,
      users: payload.users,
      messages: undefined,
      show: true
    }
    state.chatFrames.push(frame)
  },
  addNetworkPeople: (state, payload) => {
    payload.forEach(e => state.networkPeople.push(e))
  },
  addChatConversation: (state, payload) => {
    for (let chatFrame of state.chatFrames) {
      if (chatFrame.frameId === payload.frameId) {
        if (payload.action === 'first_time' || payload.action === 'scroll') {
          if (Array.isArray(chatFrame.messages)) {
            chatFrame.messages = chatFrame.messages.concat(payload.mess)
          } else {
            chatFrame.messages = payload.mess
          }
        } else if (payload.action === 'submit' || payload.action === 'pull') {
          if (Array.isArray(chatFrame.messages)) {
            chatFrame.messages = payload.mess.concat(chatFrame.messages)
          }
        }
        break
      }
    }
  },
  hideChatFrame: (state, payload) => {
    for (let chatFrame of state.chatFrames) {
      if (chatFrame.frameId === payload.frameId) {
        if (payload.action === 'hide') {
          chatFrame.show = false
        }
        break
      }
    }
  },
  showChatFrame: (state, payload) => {
    state.chatFrames[state.chatFrames.findIndex(e => e.frameId === parseInt(payload.frameId))].show = true
  }
}

const actions = {
  getNetworkPeople: (context, payload) => {
    axios({
      method: 'GET',
      baseURL: NETWORK_PEOPLE,
      withCredentials: true
    }).then(response => {
      var re = JSON.parse(response.data.replace('while(1);', ''))
      if (re.status_code === 'ok') {
        context.commit('addNetworkPeople', re.all_frames)
      }
    })
  },
  // this actions will check if is there frame exist, if yes, it will stop to server ortherwise it will
  beforeGetNetworkFrame: (context, payload) => {
    if (payload && payload.frameId !== undefined) {
      if (context.state.chatFrames.findIndex(e => e.frameId === parseInt(payload.frameId)) !== -1) {
        if (payload.source === 'pull') {
          context.dispatch('pullMessage', payload)
        }
        context.commit('showChatFrame', payload)
        return true
      }
    }
    context.dispatch('getNetworkFrame', payload)
  },
  getNetworkFrame: (context, payload) => {
    // require (frameId) or (users and total_people)
    var dataSend = {
      users: payload.usersId,
      total_people: payload.totalPeople,
      frameId: payload.frameId
    }
    axios({
      method: 'GET',
      baseURL: NETWORK_FRAME,
      withCredentials: true,
      params: dataSend
    }).then(response => {
      var e = JSON.parse(response.data.replace('while(1);', ''))
      if (e.status_code === 'ok') {
        context.dispatch('beforeAddChatFrame', e.data)
      }
      if (payload.resolve) {
        payload.resolve()
      }
    }).catch(e => {
      if (payload.reject) {
        payload.reject()
      }
    })
  },
  // we need this function because there is 2 kind: if you click a person image that has frameId then you can check that frameId exists by using beforeGetNetworkFrame. But if you click a person image that dont have frameId(ex: has chatted but in network Image 5 images in row) so you need to use getNetworkFrame to get frameId and then using this fn beforeAddChatFrame to check it is in or not in chatFrames
  beforeAddChatFrame: (context, payload) => {
    if (payload && payload.frame_id !== undefined) {
      if (state.chatFrames.findIndex(e => e.frameId === parseInt(payload.frame_id)) !== -1) {
        let a = {
          frameId: payload.frame_id
        }
        context.commit('showChatFrame', a)
        return true
      }
    }
    // this means frameId dont have in chatFrames
    context.commit('addChatFrame', payload)
  },
  getNetworkChatConversation: (context, payload) => {
    let data = {
      frameId: payload.frameId,
      action: payload.action,
      cIndex: payload.cIndex
    }
    axios({
      method: 'GET',
      baseURL: GET_NETWORK_MESSAGE,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: data
    }).then(response => {
      if (response.data.status_code === 'ok') {
        var p = {
          mess: response.data.messages,
          frameId: payload.frameId,
          action: payload.action
        }
        context.commit('addChatConversation', p)
        if (payload.resolve) {
          payload.resolve()
        }
      }
    })
  },
  submitChat: (context, payload) => {
    var data = {
      text: payload.mess.text,
      frameId: payload.frameId
    }
    axios({
      method: 'POST',
      baseURL: SEND_NETWORK_MESSAGE,
      withCredentials: true,
      data: querystring.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken'
    }).then(e => {
      var res = JSON.parse(e.data.replace('while(1);', ''))
      if (res.status_code === 'ok') {
        var data = {
          mess: res.mess,
          frameId: payload.frameId,
          action: payload.action // action is 'submit'
        }
        context.commit('addChatConversation', data)
        if (payload.resolve) {
          payload.resolve()
        }
      }
    })
  },
  pullRequest: (context, payload) => {
    axios({
      method: 'GET',
      timeout: 60000,
      baseURL: PULL_NETWORK_MESSAGE,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(e => {
      var res = JSON.parse(e.data.replace('while(1);', ''))
      if (res.status_code === 'ok') {
        if (res.on === true) {
          res.data.forEach(a => {
            var data = {
              frameId: a.frame_id,
              source: 'pull'
            }
            context.dispatch('beforeGetNetworkFrame', data)
          })
        }
        context.dispatch('pullRequest')
      }
    })
  },
  pullMessage: (context, payload) => {
    let data = {
      frameId: payload.frameId,
      action: 'pull',
      cIndex: -1
    }
    axios({
      method: 'GET',
      baseURL: GET_NETWORK_MESSAGE,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: data
    }).then(e => {
      if (e.data.status_code === 'ok') {
        var p = {
          mess: e.data.messages,
          frameId: payload.frameId,
          action: 'pull'
        }
        context.commit('addChatConversation', p)
        if (payload.resolve) {
          payload.resolve()
        }
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
