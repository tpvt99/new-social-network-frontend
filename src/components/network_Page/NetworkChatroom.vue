<template>
  <div>
    <div class="allRoomshow" v-if="showAllRoom">
      <all-room></all-room>
    </div>
    <div class="oneRoomshow" v-if="showOneRoom">
      <one-room></one-room>
    </div>
    <div class="failAuthenticationshow" v-if="showError">
      <p style="text-align:center;">Bạn truy cập vào trang không tồn tại hoặc không có quyền truy cập vào trang này. Xin thử lại sau</p>
    </div>
  </div>
</template>
<script>
import RenderAllChatroom from './components/RenderAllChatroom.vue'
import RenderOneChatroom from './components/RenderOneChatroom.vue'
export default {
  data () {
    return {
      showAllRoom: false,
      showOneRoom: false,
      showError: false
    }
  },
  components: {
    allRoom: RenderAllChatroom,
    oneRoom: RenderOneChatroom
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let roomId = this.$route.params.roomId
      let promise = new Promise((resolve, reject) => {
        let payload = {
          resolve: resolve,
          reject: reject,
          roomId: roomId,
          action: 'get_room_data'
        }
        this.$store.dispatch('networkChatroom/fetchRoomData', payload)
      })
      promise.then(e => {
        console.log(e)
        let action = e.action
        if (action === 'all') {
          this.showAllRoom = true
        } else if (action === 'one') {
          this.showOneRoom = true
        } else if (action === 'error') {
          this.showError = true
        }
      })
    }
  }
}
</script>

