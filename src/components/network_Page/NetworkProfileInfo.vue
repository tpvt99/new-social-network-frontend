<template>
  <div class="row clearfix" v-if="profileUser !== undefined">
    <div class="col span-1-of-4">
      <div class="network-profile-user">
        <img :src="profileImage" class="profileImage">
      </div>
      <p class="marCenter" @click="messageClick" v-if="!isSameUser">Nhắn tin</p>
      <!--
      <p class="marCenter" v-if="isSameUser">
        <router-link :to="{name: 'network-profile-edit'}">Chỉnh sửa thông tin</router-link>
      </p>
      -->
    </div>
    <div class="col span-3-of-4">
      <h2 class="NameUN">{{ profileUserName }}</h2>
      <div class="network-profile-info">
        <div class="_country_info">
          <p>{{ countryInfo.name }}</p>
        </div>
        <div class="_age_sex_info">
          <span v-if="sex === 'male'">Nam</span>
          <span v-else>Nữ</span>
          <span>-</span>
          <span>{{ age }} tuổi</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Mixin } from './Mixin1.js'
export default {
  mixins: [Mixin],
  methods: {
    messageClick (e) {
      e.stopPropagation()
      var x = this.profileUserNetworkId
      let promise = new Promise((resolve, reject) => {
        var payload = {
          usersId: [x],
          totalPeople: 2,
          resolve: resolve,
          reject: reject
        }
        this.$store.dispatch('networkChat/beforeGetNetworkFrame', payload)
      })
      promise.then(e => {
      }).catch(e => {
      })
    }
  }
}
</script>
