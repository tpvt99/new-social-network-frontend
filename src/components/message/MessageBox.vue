<template>
  <div class="_mess_box" v-show="isShow">
    <div class="_mqq _fl1 opened">
      <div class="_mb_head _fl1" @click.stop="clickTitleBar">
        <div class="_mb_head_title" >
          <template v-if="otherUsers.length === 1">
            <template v-for="x in otherUsers">
              <div style="line-height:30px;">
                <a :href="'/profile/' + x.profileUrl" class="aa">
                  {{x.fullname}}
                </a>
              </div>
            </template>
          </template>
        </div>
        <div class="_mb_head_opts">
          <div class="mb_cl" @click.stop="closeButton">
            <span>&#10060;</span>
          </div>
        </div>
      </div>
      <div class="_mb_main" @scroll="innerScroll" ref="scrollInner">
        <div class="_mb_inner">
          <template v-if="allMessages === undefined">
            <span class="fa fa-spinner fa-spin fa-1x fa-fw"></span>
          </template>
          <template v-else>
            <chat-inner :allMessages="reOrderMessages" :allUsers="allUsers" :type="type"></chat-inner>
          </template>
        </div>
      </div>
      <div class="_mb_chat">
        <div class="chat_div">
          <form class="chat_form">
            <div></div>
            <textarea placeholder="Nhập tin nhắn" class="textForm _lf1" @keydown="handleKeydown" v-model.trim="mess.text" spellcheck="false"></textarea>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatInner from './ChatInner.vue'
export default {
  data () {
    return {
      mess: {
        text: ''
      },
      action: '',
      oldHeight: 0,
      newHeight: 0,
      minimized: true
    }
  },
  props: {
    chatFrame: {
      type: Object
    },
    type: {
      type: String
    }
  },
  computed: {
    // this is you
    ownerUser () {
      if (this.type === 'friend') {
        return this.$store.getters['user/getUser']
      } else if (this.type === 'network') {
        return this.$store.getters['networkChat/getUserAccount']
      }
    },
    ownerUserId () {
      if (this.type === 'friend') {
        return this.ownerUser.id
      } else if (this.type === 'network') {
        return this.ownerUser.network_id
      }
    },
    // all people in frames
    allUsers () {
      return this.chatFrame.users
    },
    // this all people except you
    otherUsers () {
      if (this.type === 'network') {
        return this.allUsers.filter(e => e.network_id !== this.ownerUserId)
      } else if (this.type === 'friend') {
        return this.allUsers.filter(e => e.id !== this.ownerUserId)
      }
    },
    frameId () {
      return this.chatFrame.frameId
    },
    allMessages () {
      return this.chatFrame.messages
    },
    isShow () {
      return this.chatFrame.show
    },
    reOrderMessages () {
      if (this.allMessages !== undefined && this.allMessages.length > 0) {
        var newMessages = [{
          'u': this.allMessages[0].us,
          'm': [{
            'text': this.allMessages[0].message.text,
            'time': this.allMessages[0].time
          }]
        }]
        for (var i = 1; i < this.allMessages.length; i++) {
          let lastMessages = newMessages[newMessages.length - 1]
          if (this.allMessages[i].us === lastMessages.u) {
            lastMessages.m.splice(0, 0, {
              'text': this.allMessages[i].message.text,
              'time': this.allMessages[i].time
            })
          } else {
            newMessages.push({
              'u': this.allMessages[i].us,
              'm': [{
                'text': this.allMessages[i].message.text,
                'time': this.allMessages[i].time
              }]
            })
          }
        }
        return newMessages
      }
    }
  },
  methods: {
    clickTitleBar () {
    },
    closeButton () {
      let payload = {
        frameId: this.frameId,
        action: 'hide'
      }
      this.$store.commit('chat/hideChatFrame', payload)
    },
    handleKeydown (e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.submitMessage()
      }
      this.action = 'writing'
    },
    submitMessage () {
      var that = this
      if (this.mess.text.trim() !== '') {
        let promise = new Promise((resolve, reject) => {
          var payload = {
            frameId: this.frameId,
            mess: this.mess,
            resolve: resolve,
            reject: reject,
            action: 'submit'
          }
          this.$store.dispatch('chat/submitChat', payload)
        })
        promise.then(() => {
          that.mess.text = ''
          that.action = 'submit'
        })
      }
    },
    innerScroll (e) {
      var that = this
      if (e.target.scrollTop === 0) {
        let promise = new Promise((resolve, reject) => {
          var payload = {
            frameId: this.chatFrame.frameId,
            action: 'add',
            cIndex: Array.isArray(this.chatFrame.messages) ? this.chatFrame.messages.length : 0,
            resolve: resolve,
            reject: reject
          }
          if (this.type === 'friend') {
            this.$store.dispatch('chat/getChatConversation', payload)
          } else if (this.type === 'network') {
            this.$store.dispatch('networkChat/getNetworkChatConversation', payload)
          }
        })
        promise.then(() => {
          that.action = 'scroll'
        })
      }
    }
  },
  created () {
    var that = this
    let promise = new Promise((resolve, reject) => {
      var payload = {
        frameId: this.chatFrame.frameId,
        action: 'add',
        cIndex: Array.isArray(this.chatFrame.messages) ? this.chatFrame.messages.length : 0,
        resolve: resolve,
        reject: reject
      }
      if (this.type === 'friend') {
        this.$store.dispatch('chat/getChatConversation', payload)
      } else if (this.type === 'network') {
        payload.action = 'first_time'
        this.$store.dispatch('networkChat/getNetworkChatConversation', payload)
      }
    })
    promise.then(() => {
      if (this.type === 'friend') {
        that.action = 'add'
      } else if (this.type === 'network') {
        that.action = 'first_time'
      }
    })
  },
  beforeUpdate () {
    this.oldHeight = this.$refs.scrollInner.scrollHeight
  },
  updated () {
    this.newHeight = this.$refs.scrollInner.scrollHeight
    // this will scroll to the bottom
    if (this.action === 'submit' || this.action === 'add' || this.action === 'first_time') {
      this.$refs.scrollInner.scrollTop = this.$refs.scrollInner.scrollHeight - this.$refs.scrollInner.clientHeight
    // this will scroll to the last top position when the new content has not fetched yet
    } else if (this.action === 'scroll') {
      this.$refs.scrollInner.scrollTop = this.newHeight - this.oldHeight
    // this will scroll to bottom. Having this because poll cannot change this.action so cannot compare this.action
    } else if (this.action === 'writing') {
    } else {
      this.$refs.scrollInner.scrollTop = this.$refs.scrollInner.scrollHeight - this.$refs.scrollInner.clientHeight
    }
    this.action = ''
  },
  components: {
    chatInner: ChatInner
  }
}
</script>
