<template>
  <div style="font-family: 'Open Sans', sans-serif">
    <div>
      <header-comp></header-comp>
    </div>
    <router-view></router-view>
    <message-bar type="network"></message-bar>
  </div>
</template>
<script>
import Header from './Header.vue'
import MessageBar from '../message/MessageBar.vue'
import auth from '../../auth/auth.js'
export default {
  components: {
    headerComp: Header,
    messageBar: MessageBar
  },
  methods: {
  },
  created () {
    this.$store.dispatch('network/getNetworkProfileVisiting', this.$route.params.networkId)
  },
  beforeRouteEnter (to, from, next) {
    var p = new Promise((resolve, reject) => {
      auth.checkNetworkAuthentication(resolve, reject)
    })
    p.then(function (response) {
      next(vm => {
        vm.$store.commit('network/setUserAccount', response)
      })
    }).catch(function () {
      next({name: 'networka'})
    })
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/network/network_profile.scss';
</style>
