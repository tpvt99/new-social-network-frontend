<template>
  <div class="row">
    <div class="head-fh _fl1">
      <div class="head-title head-lh">
        <h3>
          <a href="/">
            <span style="color:red;">L</span>
            <span style="color:green;">i</span>
            <span style="color:blue;">f</span>
            <span style="color:pink;">e</span>
            <span style="color:orange;">l</span>
            <span style="color:purple;">e</span>
            <span style="color:yellow;">a</span>
            <span style="color:violet;">d</span>
          </a>
        </h3>
      </div>
      <div class="head-nav">
        <discovery-header></discovery-header>
      </div>
      <div class="head-search head-lh">
        <search-header></search-header>
      </div>
      <template v-if="!isAnonymous">
        <div class="head-icon">
          <div>
            <i class="icon fa fa-user-o"></i>
          </div>
          <div>
            <i class="icon fa fa-comments-o"></i>
          </div>
          <div @click="notiClick">
            <div class="dropdown">
              <div style="position:relative;">
                <i class="icon ion-android-notifications-none" style="cursor:pointer;"></i>
                <template v-if="unreadNoti > 0">
                  <span class="noti-unread">{{ unreadNoti }}</span>
                </template>
              </div>
              <div class="dropdown-menu noti-header" ref="dropdownNoti">
                <noti-header :allNotis="notifications"></noti-header>
              </div>
            </div>
          </div>
          <div @click="userClick" style="cursor:pointer;">
            <div class="dropdown">
              <img :src="profileimage">
              <div class="dropdown-menu user-header" ref="dropdownMenu">
                <user-header></user-header>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import UserHeader from './UserHeader.vue'
import NotiHeader from './NotiHeader.vue'
import { PROFILE_URL } from '../../url/url.js'
import dropdown from '../../helpers/dropdown.js'
import SearchHeader from './SearchHeader.vue'
import DiscoveryHeader from './DiscoveryHeader.vue'
export default {
  data () {
    return {
      user_image: ''
    }
  },
  methods: {
    userClick (e) {
      e.stopPropagation()
      this.resetDropdown()
      this.$refs.dropdownMenu.style.display = 'block'
    },
    notiClick (e) {
      e.stopPropagation()
      this.resetDropdown()
      this.$refs.dropdownNoti.style.display = 'block'
    },
    resetDropdown () {
      dropdown.closeOtherDropdowns()
    }
  },
  computed: {
    fullname () {
      return this.$store.getters['user/getFullname']
    },
    profileimage () {
      return this.$store.getters['user/getProfileImage']
    },
    notifications () {
      return this.$store.getters['notification/getAllNoti']
    },
    profileUrl () {
      return PROFILE_URL + this.$store.getters['user/getProfileUrl']
    },
    unreadNoti () {
      console.log(this.$store.getters['notification/getUnreadNoti'])
      return this.$store.getters['notification/getUnreadNoti']
    },
    isAnonymous () {
      return this.$store.getters['user/isAnonymous']
    }
  },
  components: {
    userHeader: UserHeader,
    notiHeader: NotiHeader,
    searchHeader: SearchHeader,
    discoveryHeader: DiscoveryHeader
  },
  mounted () {
    this.$store.dispatch('notification/fetchNotification')
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/header/header.scss';
</style>
