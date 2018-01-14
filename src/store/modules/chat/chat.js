import { ONLINE_FRIENDS, POST_ONLINE, CHAT_FRAME_INFORMATION, GET_MESSAGE, SUBMIT_CHAT, POLL_REQUEST } from '../../../api/api.js'
import querystring from 'query-string'
import axios from 'axios'

const state = {
  friendOnlines: [],
  chatFrames: []
}

const getters = {
  getFriendOnlines: (state) => {
    return state.friendOnlines
  },
  getChatFrames: (state) => {
    return state.chatFrames
  }
}

const actions = {
  fetchFriendOnlines (context) {
    axios({
      method: 'GET',
      withCredentials: true,
      baseURL: ONLINE_FRIENDS
    }).then((response) => {
      if (response.data.status_code === 'ok') {
        context.commit('setFriendOnlines', response.data.friends)
        context.dispatch('onlineStatus')
      }
    })
  },
  onlineStatus: (context) => {
    function postOnline () {
      axios({
        method: 'POST',
        baseURL: POST_ONLINE,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        withCredentials: true
      }).then((response) => {
        var data = JSON.parse(response.data.replace('while(1);', ''))
        if (data.status_code === 'error') {
          clearInterval(a)
        } else {
          // context.commit('changeOnlineTime', data.data)
        }
      }).catch(() => {
        clearInterval(a)
      })
    }
    var a = setInterval(function b () {
      postOnline()
    }, 60000)
    function postNow () {
      axios({
        method: 'POST',
        baseURL: POST_ONLINE,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        withCredentials: true
      })
    }
    postNow()
  },
  beforeAddChatFrame: (context, payload) => {
    if (payload.frameId) {
      if (context.state.chatFrames.findIndex(e => e.frameId === parseInt(payload.frameId)) !== -1) {
        if (payload.source && payload.source === 'pullRequest') {
          context.dispatch('pullMessage', payload)
        }
        context.state.chatFrames[state.chatFrames.findIndex(e => e.frameId === parseInt(payload.frameId))].show = true
        return
      }
    }
    context.dispatch('addChatFrame', payload)
  },
  // this is a promise action having resolve and reject
  addChatFrame: (context, payload) => {
    let data = {
      listId: payload.listId, // id of target user who is forward message to
      target: payload.target, // target is one of USER of GROUP
      total: payload.total // total number people in chat
    }
    axios({
      method: 'get',
      baseURL: CHAT_FRAME_INFORMATION,
      withCredentials: true,
      params: data
    }).then((e) => {
      var res = JSON.parse(e.data.replace('while(1);', ''))
      if (res.status_code === 'ok') {
        if (payload.source) {
          res.source = payload.source
        }
        if (payload.resolve) {
          payload.resolve({
            frameId: res.frame_id
          })
        }
        context.commit('setChatFrame', res)
      }
    })
  },
  // this is a promise function with resolve and reject
  getChatConversation (context, payload) {
    let data = {
      frameId: payload.frameId,
      action: payload.action,
      cIndex: payload.cIndex
    }
    axios({
      method: 'GET',
      baseURL: GET_MESSAGE,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: data
    }).then(e => {
      var res = JSON.parse(e.data.replace('while(1);', ''))
      if (res.status_code === 'ok') {
        var p = {
          mess: res.mess,
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
  // this is promise action having resolve and reject
  submitChat: (context, payload) => {
    var data = {
      text: payload.mess.text,
      frameId: payload.frameId
    }
    axios({
      method: 'POST',
      baseURL: SUBMIT_CHAT,
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
          action: 'submit'
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
      timeout: 50000,
      baseURL: POLL_REQUEST,
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
              listId: a.allExp,
              target: a.target,
              total: a.total,
              source: 'pullRequest',
              frameId: a.fid
            }
            context.dispatch('beforeAddChatFrame', data)
          })
        }
        context.dispatch('pullRequest')
      }
    })
  },
  pullMessage: (context, payload) => {
    let data = {
      frameId: payload.frameId,
      action: 'poll',
      cIndex: -1
    }
    axios({
      method: 'GET',
      baseURL: GET_MESSAGE,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: data
    }).then(e => {
      var res = JSON.parse(e.data.replace('while(1);', ''))
      if (res.status_code === 'ok') {
        var p = {
          mess: res.mess,
          frameId: payload.frameId,
          action: 'poll'
        }
        context.commit('addChatConversation', p)
        if (payload.resolve) {
          payload.resolve()
        }
      }
    })
  }
}

const mutations = {
  setFriendOnlines: (state, payload) => {
    state.friendOnlines = payload
  },
  changeOnlineTime: (state, payload) => {
    state.friendOnlines = state.friendOnlines.map(function (e, index) {
      e.time = payload[payload.findIndex((a) => a.f === e.friend.id)].t
      return e
    })
  },
  setChatFrame: (state, payload) => {
    var data = {
      frameId: payload.frame_id,
      users: payload.users,
      show: true,
      messages: undefined,
      priority: state.chatFrames.length
    }
    state.chatFrames.splice(0, 0, data)
  },
  addChatConversation: (state, payload) => {
    for (let chatFrame of state.chatFrames) {
      if (chatFrame.frameId === payload.frameId) {
        if (payload.action === 'add') {
          if (Array.isArray(chatFrame.messages)) {
            chatFrame.messages = chatFrame.messages.concat(payload.mess)
          } else {
            chatFrame.messages = payload.mess
          }
        } else if (payload.action === 'submit' || payload.action === 'poll') {
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
  }
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
