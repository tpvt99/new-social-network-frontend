<template>
  <div class="row">
    <div v-if="isShow">
      <div class="topicInfo">
        <h3>{{ topicName }}</h3>
      </div>
      <div class="topicRoom">
        <all-rooms v-for="room in allRooms" :room="room" :key="room"></all-rooms>
      </div>
    </div>
    <div v-if="isWrongTopic">
      <p>Không tồn tại chủ đề này. Xin thử lại chủ đề khác!</p>
    </div>
  </div>
</template>
<script>
import RoomInTopic from './components/RoomsInTopic.vue'
export default {
  data () {
    return {
      isShow: false,
      isWrongTopic: false,
      topic: undefined,
      allRooms: undefined
    }
  },
  computed: {
    topicName () {
      return this.topic.name
    }
  },
  components: {
    allRooms: RoomInTopic
  },
  created () {
    let promise = new Promise((resolve, reject) => {
      let payload = {
        topic_url: this.$route.params.topicname,
        action: 'topic_room',
        resolve: resolve,
        reject: reject
      }
      this.$store.dispatch('networkChatroom/fetchRoomInEachTopic', payload)
    })
    promise.then(e => {
      if (e.status_code === 'error') {
        this.isWrongTopic = true
      } else if (e.status_code === 'ok') {
        this.topic = e.topic[0]
        this.allRooms = e.data
        this.isShow = true
      }
    })
  }
}
</script>
