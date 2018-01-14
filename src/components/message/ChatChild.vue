<template>
  <div v-if="!isOwnerUser" class="_mleft">
    <div class="_mleft_wrapper _fl1">
      <div class="_mleft1">
        <a :href="profileUrl">
          <img :src="profileImage">
        </a>
      </div>
      <div class="_mleft2">
        <template v-for="(message, index) in messArray">
          <template v-if="message.text !== ''">
            <div class="_mleft2_wr">
              <template v-if="messArray.length === 1">
                <div class="mText _mbrl1">
                  {{message.text}}
                </div>
              </template>
              <template v-else>
                <div class="mText _mbrl21" v-if="index === 0">
                  {{message.text}}
                </div>
                <div class="mText _mbrl23" v-else-if="index === messArray.length - 1">
                  {{message.text}}
                </div>
                <div class="mText _mbrl22" v-else>
                  {{message.text}}
                </div>
              </template>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
  <div v-else class="_mright">
    <div class="_fl1 _mright_wrapper">
      <div class="_mright2">
        <template v-for="(message, index) in messArray">
          <template v-if="message.text !== ''">
            <div class="_mright2_wr clearfix">
              <template v-if="messArray.length === 1">
                <div class="mText _mbrr1">
                  {{message.text}}
                </div>
              </template>
              <template v-else>
                <div class="mText _mbrr21" v-if="index === 0">
                  {{ message.text }}
                </div>
                <div class="mText _mbrr23" v-else-if="index === messArray.length - 1">
                  {{ message.text }}
                </div>
                <div class="mText _mbrr22" v-else>
                  {{ message.text }}
                </div>
              </template>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object
    },
    allUsers: {
      type: Array
    },
    type: {
      type: String
    }
  },
  computed: {
    messArray () {
      return this.message.m
    },
    messUser () {
      var a = this.message.u
      var x
      if (this.type === 'friend') {
        x = this.allUsers.findIndex(e => {
          return e.id === a
        })
        return this.allUsers[x]
      } else if (this.type === 'network') {
        x = this.allUsers.findIndex(e => {
          return e.network_id === a
        })
        return this.allUsers[x]
      }
    },
    fullname () {
      return this.messUser.fullname
    },
    profileUrl () {
      if (this.type === 'friend') {
        return 'profile/' + this.messUser.profileUrl
      } else if (this.type === 'network') {
        return 'network/user/' + this.messUser.network_id
      }
    },
    profileImage () {
      if (this.type === 'friend') {
        return this.messUser.profileimage
      } else if (this.type === 'network') {
        return this.messUser.profile_picture.image_url
      }
    },
    isOwnerUser () {
      if (this.type === 'friend') {
        return this.$store.getters['user/getId'] === this.messUser.id
      } else if (this.type === 'network') {
        return this.$store.getters['network/getUserAccount'].network_id === this.messUser.network_id
      }
    }
  }
}
</script>
