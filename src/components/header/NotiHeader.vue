<template>
  <div class="noti_pa">
    <div class="noti_intro">
      <p>Thông báo</p>
    </div>
    <template v-if="allNotis.length > 0">
      <div class="noti_scroll" >
        <div class="notiScrollWrap" @mouseover="scrollShow" @mouseout="scrollHide" ref="notiWrap">
          <div class="noti_child" ref="notiChild" @scroll="update">
            <template v-for="noti in allNotis">
              <noti-child :noti="noti" :key="noti"></noti-child>
            </template>
          </div>
        </div>
      </div>
      </template>
      <template v-else>
        <div class="noti_blank">
          <p>Không có thông báo nào</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import NotiChild from './NotiChild.vue'
export default {
  data () {
    return {
      height: []
    }
  },
  props: {
    allNotis: {
      type: Array
    }
  },
  components: {
    notiChild: NotiChild
  },
  methods: {
    scrollShow () {
      this.$refs.notiChild.style.marginRight = '0px'
      this.$refs.notiChild.style.paddingRight = '0px'
    },
    scrollHide () {
      this.$refs.notiChild.style.marginRight = '-30px'
      this.$refs.notiChild.style.paddingRight = '30px'
    },
    update (e) {
      if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
        if (this.height.indexOf(e.target.scrollHeight) === -1) {
          this.height.push(e.target.scrollHeight)
          this.$store.dispatch('notification/fetchNotification')
        }
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/header/notiheader.scss';
</style>
