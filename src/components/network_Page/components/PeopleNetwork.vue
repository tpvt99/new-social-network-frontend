<template>
  <div class="userNetworkInfo">
    <div style="text-align:center;font-size:15px;margin:5px 0;">{{ selectGoal | languageFilter }}</div>
    <div class="userImage" :style="{backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0,0)), url(' + userImage.image_url + ')'}" @click.stop="showOptions = !showOptions">
      <div class="userNationality _fl1" :title="age + ' tuổi'">
        <span style="font-size:16px;" class="_rm">{{age}}</span>
        <img :src="flagCountry.flag24" width="24px" height="24px" :title="flagCountry.name">
      </div>
      <div class="userClickOptions _fl1 _fl1a" v-if="showOptions">
        <div class="clickDiv" title="Nhắn tin" data-frame="" @click.prevent.stop="handleFrame($event, userId)" v-if="networkAccount.network_id !== userId">
          <span class="fa fa-comments-o"></span>
        </div>
        <div class="clickDiv" title="Profile">
          <a :href="userUrl" class="_cl_inherit">
            <span class="fa fa-user-o"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="userName">
      <p class="name _ptext">
        <span>{{ userName }}</span>
        <span v-if="sex === 'male'" class="_lm"><span class="fa fa-mars network-gender genderMale"></span></span>
        <span v-else class="_lm"><span class="fa fa-venus network-gender genderFemale"></span></span>
      </p>
      <p class="intro" ref="intro">
        {{ introduction }}
      </p>
    </div>
  </div>
</template>
<script>
import { Mixin } from '../Mixin.js'
import country from '../../../helpers/country.js'
export default {
  data () {
    return {
      showOptions: false
    }
  },
  props: ['data'],
  mixins: [Mixin],
  computed: {
    userImage () {
      return this.data.user.profile_picture
    },
    userName () {
      return this.data.user.fullname
    },
    userId () {
      return this.data.user.network_id
    },
    userUrl () {
      return 'network/user/' + this.userId
    },
    nationality () {
      return this.data.user.nationality
    },
    sex () {
      return this.data.user.sex
    },
    flagCountry () {
      return country.countryCode.find(e => e.iso2 === this.nationality)
    },
    age () {
      return new Date().getFullYear() - this.data.user.birthYear
    },
    // because goal is a list
    goal () {
      return this.data.goal[0]
    },
    selectGoal () {
      return this.goal.select_goal
    },
    introduction () {
      return this.goal.introduction
    },
    networkAccount () {
      return this.$store.getters['network/getUserAccount']
    }
  },
  mounted () {
    window.$clamp(this.$refs.intro, {clamp: 3})
  },
  methods: {
    handleFrame (e, data) {
      e.stopPropagation()
      let promise = new Promise((resolve, reject) => {
        var payload = {
          usersId: [data],
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
