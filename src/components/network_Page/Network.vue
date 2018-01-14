<template>
  <div>
    <div style="font-family: 'Open Sans', sans-serif">
      <header-comp></header-comp>
    </div>
    <router-view></router-view>
    <message-bar type="network"></message-bar>
  </div>
</template>
<script>
import Header from './Header.vue'
import auth from '../../auth/auth.js'
import MessageBar from '../message/MessageBar.vue'
export default {
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    }
  },
  components: {
    headerComp: Header,
    messageBar: MessageBar
  },
  mounted () {
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.dropdown-menu').forEach(function (e) {
        e.style.display = 'none'
      })
    })
  },
  created () {
    this.$store.dispatch('chat/onlineStatus')
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
@import '../../../static/scss/penpal/penpal.scss';
</style>
