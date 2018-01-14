import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user/user.js'
import newfeed from './modules/status/status.js'
import notification from './modules/notification/notification.js'
import profile from './modules/profile/profile.js'
import message from './modules/message/message.js'
import chat from './modules/chat/chat.js'
import network from './modules/network/network.js'
import networkChat from './modules/network/network_chat.js'
import networkChatroom from './modules/network/network_chatroom.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
  },
  modules: {
    user: user,
    newfeed: newfeed,
    notification: notification,
    profile: profile,
    message: message,
    chat: chat,
    network: network,
    networkChat: networkChat,
    networkChatroom: networkChatroom
  }
})
