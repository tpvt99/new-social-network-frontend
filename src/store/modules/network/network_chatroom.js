import axios from 'axios'
import { SEARCH_CHAT_TOPIC, CHAT_TOPIC_CREATE, CHAT_ROOM_SETTINGS, GET_NETWORK_MESSAGE, SEND_NETWORK_MESSAGE } from '../../../api/api.js'
import querystring from 'query-string'
const state = {
  // this is all rooms you are joining to chat
  allRooms: [],
  currentRoom: undefined
}

const getters = {
  getAllRooms: (state) => {
    return state.allRooms
  },
  getCurrentRoom: (state) => {
    return state.currentRoom
  }
}

const mutations = {
  setAllRooms: (state, payload) => {
    state.allRooms = payload
  },
  setOneRoom: (state, payload) => {
    state.currentRoom = {
      room: payload[0],
      messages: undefined
    }
  },
  // adding directly messages into currentRoom because everytime accessing each room is everytime currentRoom is new
  addChatConversation: (state, payload) => {
    if (payload.frameId === state.currentRoom.room.frame_id) {
      if (payload.action === 'first_time' || payload.action === 'scroll') {
        if (Array.isArray(state.currentRoom.messages)) {
          state.currentRoom.messages = state.currentRoom.messages.concat(payload.mess)
        } else {
          state.currentRoom.messages = payload.mess
        }
      } else if (payload.action === 'submit') {
        state.currentRoom.messages = payload.mess.concat(state.currentRoom.messages)
      }
    }
  }
}

const actions = {
  searchTopic: (context, payload) => {
    var data = {
      search: payload.search,
      action: payload.action
    }
    axios({
      method: 'GET',
      baseURL: SEARCH_CHAT_TOPIC,
      params: data,
      withCredentials: true
    }).then(e => {
      var re = JSON.parse(e.data.replace('while(1);', ''))
      if (re.status_code === 'ok') {
        if (payload && payload.resolve) {
          payload.resolve(re)
        }
      }
    })
  },
  createTopic: (context, payload) => {
    var data = {
      topic: payload.topic,
      topic_description: payload.topicDescription,
      action: payload.action
    }
    axios({
      method: 'POST',
      baseURL: CHAT_TOPIC_CREATE,
      data: querystring.stringify(data),
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true
    }).then(e => {
      var re = JSON.parse(e.data.replace('while(1);', ''))
      if (re.status_code === 'ok') {
        if (payload && payload.resolve) {
          payload.resolve(re)
        }
      } else if (re.status_code === 'duplicate') {
        alert('Chủ đề đã trùng. Xin chọn chủ đề khác')
      }
    })
  },
  createRoom: (context, payload) => {
    let data = {
      room_name: payload.room_name,
      room_des: payload.room_description,
      tag_topic_id: payload.tag_topic_id,
      action: payload.action
    }
    axios({
      method: 'POST',
      baseURL: CHAT_ROOM_SETTINGS,
      data: querystring.stringify(data),
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true
    }).then(e => {
      var re = JSON.parse(e.data.replace('while(1);', ''))
      if (re.status_code === 'ok') {
        if (payload && payload.resolve) {
          payload.resolve(re)
        }
      }
    })
  },
  // this actions is fetching all rooms in a topic
  fetchRoomInEachTopic: (context, payload) => {
    let data = {
      topic_url: payload.topic_url,
      action: payload.action
    }
    axios({
      method: 'GET',
      baseURL: SEARCH_CHAT_TOPIC,
      params: data,
      withCredentials: true
    }).then(res => {
      let e = JSON.parse(res.data.replace('while(1);', ''))
      if (payload.resolve) {
        payload.resolve(e)
      }
    })
  },
  // fetch the data of the room you are chatting
  fetchRoomData: (context, payload) => {
    let data = {
      room_id: payload.roomId,
      action: payload.action
    }
    axios({
      method: 'GET',
      baseURL: CHAT_ROOM_SETTINGS,
      params: data,
      withCredentials: true
    }).then(res => {
      let e = JSON.parse(res.data.replace('while(1);', ''))
      if (e.status_code === 'ok') {
        if (e.action === 'all') {
          let allRooms = e.data
          context.commit('setAllRooms', allRooms)
        } else if (e.action === 'one') {
          let oneRoom = e.data
          context.commit('setOneRoom', oneRoom)
        }
      }
      if (payload.resolve) {
        payload.resolve(e)
      }
    })
  },
  fetchRoomMessage: (context, payload) => {
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
  joinChatroom: (context, payload) => {
    var data = {
      action: payload.action,
      room_id: payload.roomId,
      accept_id: payload.acceptId
    }
    axios({
      method: 'POST',
      baseURL: CHAT_ROOM_SETTINGS,
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
        if (payload.resolve) {
          payload.resolve(res)
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
