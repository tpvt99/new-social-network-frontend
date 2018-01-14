<template>
  <div>
    <div class="global-header _hfixed">
      <div class="global-inner">
        <header-comp></header-comp>
      </div>
    </div>
    <div class="global-body">
      <web-comp></web-comp>
    </div>
    <message-bar type="friend"></message-bar>
  </div>
</template>
<script>
import Message from '../message/Message.vue'
import Header from './../header/Header.vue'
import WebPage from './WebPage.vue'
import MessageBar from '../message/MessageBar.vue'
import auth from '../../auth/auth.js'
export default {
  components: {
    headerComp: Header,
    webComp: WebPage,
    message: Message,
    messageBar: MessageBar
  },
  created () {
    let payload = {
      tab_section: this.$route.query.tab === undefined ? '' : this.$route.query.tab
    }
    this.$store.dispatch('newfeed/fetchStatus', payload)
  },
  mounted () {
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.dropdown-menu').forEach(function (e) {
        e.style.display = 'none'
      })
    })
  },
  beforeRouteEnter (to, from, next) {
    var p = new Promise((resolve, reject) => {
      auth.checkAuthentication(resolve, reject)
    })
    p.then(function (data) {
      next(vm => {
        vm.$store.commit('user/setUser', data)
      })
    }).catch(function () {
      next({name: 'frontpage'})
    })
  }
}
</script>
<style lang="scss" scoped>
@import './../../../static/scss/timeline/timeline.scss';
</style>
