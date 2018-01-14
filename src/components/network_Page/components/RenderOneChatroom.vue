<template>
  <div class="chatRoom">
    <section class="oneRoom clearfix _fl1" ref="a">
      <section class="listUser col span-1-of-4">
        <div>
          <render-users-chat v-for="user in allPeople" :user="user" :key="user"></render-users-chat>
        </div>
      </section>
      <section class="listConversation col span-3-of-4">
        <render-chat :room="currentRoom"></render-chat>
      </section>
    </section>
  </div>
</template>
<script>
import RenderUsersChat from './RenderUsersChat.vue'
import RenderChat from './RenderChat.vue'
export default {
  computed: {
    currentRoom () {
      return this.$store.getters['networkChatroom/getCurrentRoom']
    },
    allPeople () {
      return this.currentRoom.room.users
    },
    currentRoomId () {
      return this.currentRoom.room.id
    },
    currentRoomFrameId () {
      return this.currentRoom.room.frame_id
    }
  },
  created () {
  },
  components: {
    renderUsersChat: RenderUsersChat,
    renderChat: RenderChat
  },
  mounted () {
    let innerHeight = window.innerHeight
    let headerHeight = 60
    console.log(innerHeight - headerHeight)
    this.$refs.a.style.height = innerHeight - headerHeight + 'px'
  }
}
</script>
