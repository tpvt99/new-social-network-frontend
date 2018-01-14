<template>
  <div style="position:relative;height:100%;">
    <div class="chatCon">
      <div class="_mb_main" @scroll="innerScroll" ref="scrollInner">
        <template v-if="allMessages === undefined">
          <span class="fa fa-spinner fa-spin fa-1x fa-fw"></span>
        </template>
        <template v-else>
          <chat-inner :allMessages="reOrderMessages" :allUsers="allUsers" :type="type"></chat-inner>
        </template>
      </div>
    </div>
    <div class="chatTextbox">
      <textarea rows="1" placeholder="Nhập tin nhắn" v-model="mess.text" @keydown="handleKeydown"></textarea>
    </div>
  </div>
</template>
<script>
import ChatInner from '../../message/ChatInner.vue'
export default {
  data () {
    return {
      mess: {
        text: ''
      },
      action: '',
      oldHeight: 0,
      newHeight: 0,
      type: 'network'
    }
  },
  props: ['room'],
  components: {
    chatInner: ChatInner
  },
  computed: {
    frameId () {
      return this.room.room.frame_id
    },
    allMessages () {
      return this.room.messages
    },
    allUsers () {
      return this.room.room.users
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
  created () {
    let payload = {
      frameId: this.frameId,
      cIndex: Array.isArray(this.room.messages) ? this.room.messages.length : 0,
      action: 'first_time'
    }
    this.$store.dispatch('networkChatroom/fetchRoomMessage', payload)
  },
  methods: {
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
          this.$store.dispatch('networkChatroom/submitChat', payload)
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
  }
}
</script>
