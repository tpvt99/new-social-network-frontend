<template>
  <div class="aal-Room">
    <div class="roomTopics">
      <template v-for="topic in roomTopics">
        <span class="innerTopic"><a :href="'/network/chatroom/topic/' + topic.url" class="_cl_inherit">{{ topic.name }}</a></span>
      </template>
    </div>
    <h3><a :href="roomUrl" class="_cl_inherit">{{ roomName }}</a></h3>
    <p style="padding-bottom:5px;">{{ roomDescription }}</p>
    <p style="padding:5px 20px;border-top:1px solid #eee;"></p>
    <p><span>{{ roomUsers.length }}</span><span class="_lm">người tham gia nhóm chat</span></p>
    <div class="" v-if="roomPendingUsers.length > 0">
      <p>Có người muốn tham gia nhóm của bạn.</p>
      <template v-for="user in roomPendingUsers">
        <div style="display:inline-block">
          <a class="_fl3a _cl_inherit" :href="'/network/user/' + user.network_id">
            <img :src="user.profile_picture.image_url" width="50px" height="50px" style="border-radius:50%;">
            <span class="_lm">{{user.fullname}}</span>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: ['room'],
  computed: {
    // name of the room
    roomName () {
      return this.room.name
    },
    // description of the room
    roomDescription () {
      return this.room.description
    },
    roomId () {
      return this.room.id
    },
    // topics of room
    roomTopics () {
      return this.room.topics
    },
    roomUrl () {
      return '/network/chatroom/room/' + this.roomId
    },
    roomUsers () {
      return this.room.users
    },
    roomPendingUsers () {
      return this.room.users_pending !== null ? this.room.users_pending : []
    }
  },
  created () {
  }
}
</script>
