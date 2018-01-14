<template>
  <div class="networkMChild" :title="chatPeopleAccountName" @click="divClick">
    <img :src="chatPeopleAccountImage.image_url">
  </div>
</template>
<script>
export default {
  props: ['frame'],
  methods: {
    divClick (e) {
      var that = this
      e.stopPropagation()
      let promise = new Promise((resolve, reject) => {
        var payload = {
          usersId: [that.chatPeopleAccount.network_id],
          frameId: that.frameId,
          totalPeople: that.networkPeople.length,
          resolve: resolve,
          reject: reject
        }
        this.$store.dispatch('networkChat/beforeGetNetworkFrame', payload)
      })
      promise.then(e => {
      })
    }
  },
  computed: {
    frameId () {
      return this.frame.frame_id
    },
    // all people in frames including you and others people whom you are chatting with
    networkPeople () {
      return this.frame.users
    },
    // this is you
    userAccount () {
      return this.$store.getters['network/getUserAccount']
    },
    userAccountId () {
      return this.userAccount.network_id
    },
    // this is all people in network frame except you
    chatPeopleAccount () {
      return this.networkPeople.filter(e => e.network_id !== this.userAccountId)[0]
    },
    // this is people you are chatting to, just 1 only now -- will be improved to more than 2 people
    chatPeopleAccountImage () {
      return this.chatPeopleAccount.profile_picture
    },
    chatPeopleAccountName () {
      return this.chatPeopleAccount.fullname
    }
  }
}
</script>
