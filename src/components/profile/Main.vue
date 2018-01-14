<template>
  <div>
    <div class="_bg_pa">
      <template v-if="backgroundImage">
        <div :style="{backgroundImage : 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))'+ ','+ 'url(' + backgroundImage + ')' }" class="_bg_">
          <main-user></main-user>
        </div>
      </template>
      <template v-else>
        <div class="_bg_" style="background-color:#fff;">
          <main-user></main-user>
        </div>
      </template>
    </div>
    <div class="_pr_main clearfix">
      <div class="_pr_intro">
        <h3 class="li_text"><span>Giới thiệu</span></h3>
      </div>
      <div class="_pr_fr">
        <h3 class="li_text"><span>Bạn bè</span><span class="_lm">(</span><span class="_lm">{{totalFriends}}</span><span class="_lm">)</span></h3>
        <div class="fr_list">
          <template v-for="friend in friends">
            <div>
              <div :style="{backgroundImage : 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5))' + ',' + 'url(' + friend.profileimage + ')'}" class="fr_img">
                <p>
                  <a :href="'/profile/' + friend.profileUrl" style="color:inherit;">{{ friend.fullname }}</a>
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="pr_nav">
      <div>
        <div class="_pr_nav_c active">
          <p>Tường nhà</p>
        </div>
        <div class="_pr_nav_c">
          <p>Bạn bè</p>
        </div>
      </div>
    </div>
    <div class="_pr_main">
      <new-feed></new-feed>
    </div>
  </div>
</template>
<script>
import MainUser from './MainUser.vue'
import NewFeed from './NewFeed.vue'
export default {
  computed: {
    backgroundImage () {
      return this.$store.getters['profile/getBackgroundImage']
    },
    totalFriends () {
      return this.$store.getters['profile/getTotalFriends']
    },
    friends () {
      return this.$store.getters['profile/getFriends']
    }
  },
  components: {
    mainUser: MainUser,
    newFeed: NewFeed
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/profile/profile.scss';
</style>
