<template>
  <div class="roomTpMain">
    <div class="roomTopics">
      <template v-for="topic in roomTopics">
        <span class="innerTopic"><a :href="'/network/chatroom/topic/' + topic.url" class="_cl_inherit">{{ topic.name }}</a></span>
      </template>
    </div>
    <div class="roomTp RoomInfo">
      <h3>
        <a :href="roomUrl" class="_cl_inherit" v-if="isJoinedRoom">{{ roomName }}</a>
        <a class="_cl_inherit" v-else>{{ roomName }}</a>
        <template v-if="isJoinedRoom">
          <span class="fa fa-check-circle-o" style="color:#2ecc71;" title="Đã tham gia"></span>
        </template>
      </h3>
      <p>{{ roomDescription }}</p>
    </div>
    <div class="roomTp PartiInfo">
      <div class="">
        <p>
          <span>Số lượng người chat</span>
          <span>{{ roomUsers.length }}</span><span>/{{room.max_people}}</span>
          <span>-</span>
          <span class="_lm">{{ roomUsersBoys }}</span>
          <span class="fa fa-mars" style="color:blue;"></span>
          <span class="_lm">{{ roomUsersGirls }}</span>
          <span class="fa fa-venus" style="color:#f62459"></span>
        </p>
      </div>
      <div class="roomTp Button" v-if="!isJoinedRoom">
        <template v-if="!isWaitingToAcceptRoom">
          <button class="ButtonJoin ButtonRen btn" @click="joinRoom" ref="buttonClick1" autocomplete="off" data-action="join">Tham gia</button>
        </template>
        <template v-if="isWaitingToAcceptRoom">
          <button class="ButtonCancel ButtonRen btn" @click="joinRoom" ref="buttonClick1" autocomplete="off" data-action="cancel">Hủy tham gia</button>
        </template>
      </div>
      <div class="roomTp Owneruser _fl3a" style="cursor:pointer;" @click="goToProfile">
        <img :src="roomOwnerProfilePicture" class="rppImage">
        <span class="_lm">{{ roomOwnerFullname }}</span>
        <span class="_lm">- {{ roomOwnerAge }} tuổi</span>
        <img :src="roomOwnerNationality.flag24" width="24px" height="24px" class="_lm" :title="roomOwnerNationality.name">
      </div>
      <template v-if="inRoomManage">
        <div class="roomTp pendingUser Button" v-if="roomPendingUsers.length > 0">
          <p style="color:#1abc9c;">Có {{ roomPendingUsers.length }} người muốn tham gia phòng chat của bạn</p>
          <template v-for="user in roomPendingUsers">
            <div style="display:inline-block">
              <div class="_fl3a">
                <a class="_fl3a _cl_inherit" :href="'/network/user/' + user.network_id">
                  <img :src="user.profile_picture.image_url" width="50px" height="50px" style="border-radius:50%;">
                  <span class="_lm">{{user.fullname}}</span>
                </a>
                <div>
                  <button class="ButtonAccept ButtonRen btn" @click="joinRoom" ref="buttonClick1" autocomplete="off" data-action="accept" style="margin:0px 5px;" :data-user="user.network_id">Chấp nhận</button>
                  <button class="ButtonCancel ButtonRen btn" @click="joinRoom" ref="buttonClick1" autocomplete="off" data-action="owner_cancel" style="margin:0 5px;" :data-user="user.network_id">Từ chối</button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import countryCode from '../../../helpers/country.js'
export default {
  data () {
    return {
      inRoomManage: false
    }
  },
  props: ['room'],
  computed: {
    roomName () {
      return this.room.name
    },
    roomDescription () {
      return this.room.description
    },
    roomId () {
      return this.room.id
    },
    // return all users is chatting in room
    roomUsers () {
      return this.room.users
    },
    roomTopics () {
      return this.room.topics
    },
    roomUrl () {
      return '/network/chatroom/room/' + this.roomId
    },
    roomPendingUsers () {
      return this.room.users_pending
    },
    roomUsersBoys () {
      return this.room.users.filter(e => e.sex === 'male').length
    },
    roomUsersGirls () {
      return this.roomUsers.length - this.roomUsersBoys
    },
    roomOwner () {
      return this.room.owner
    },
    roomOwnerFullname () {
      return this.roomOwner.fullname
    },
    roomOwnerProfilePicture () {
      return this.roomOwner.profile_picture.image_url
    },
    roomOwnerId () {
      return this.roomOwner.network_id
    },
    roomOwnerAge () {
      return new Date().getFullYear() - this.roomOwner.birthYear
    },
    roomOwnerNationality () {
      let a = this.roomOwner.nationality
      return countryCode.countryCode.find(e => e.iso2 === a)
    },
    roomOwnerProfileUrl () {
      return '/network/user/' + this.roomOwnerId
    },
    // this return the network account of user is browsing to get the id to check agains the right to join each room
    networkAccount () {
      return this.$store.getters['network/getUserAccount']
    },
    networkAccountId () {
      return this.networkAccount.network_id
    },
    // true if user is the room owner
    isRoomOwner () {
      return this.networkAccountId === this.roomOwnerId
    },
    // true if user has joined in this room
    isJoinedRoom () {
      return this.roomUsers.findIndex(e => e.network_id === this.networkAccountId) !== -1
    },
    // true if user had made an invitation but the owner has not accepted
    isWaitingToAcceptRoom () {
      return this.roomPendingUsers.findIndex(e => e.network_id === this.networkAccountId) !== -1
    }
  },
  methods: {
    goToProfile () {
      this.$router.push(this.roomOwnerProfileUrl)
    },
    joinRoom (ev) {
      var action = ''
      var acceptId = ''
      if (ev.target.dataset.action === 'join') {
        action = 'join_room'
      } else if (ev.target.dataset.action === 'cancel') {
        action = 'cancel_room'
      } else if (ev.target.dataset.action === 'accept') {
        action = 'accept_room'
        acceptId = ev.target.dataset.user
      } else if (ev.target.dataset.action === 'owner_cancel') {
        action = 'owner_cancel_room'
        acceptId = ev.target.dataset.user
      }
      let promise = new Promise((resolve, reject) => {
        let payload = {
          action: action,
          roomId: this.roomId,
          acceptId: acceptId,
          resolve: resolve,
          reject: reject
        }
        this.$store.dispatch('networkChatroom/joinChatroom', payload)
      })
      promise.then(e => {
        if (e.status_code === 'ok') {
          // request to join room has succeeded. Now revert back to cancel room
          if (action === 'join_room') {
            this.$refs.buttonClick1.textContent = 'Hủy tham gia'
            this.$refs.buttonClick1.className = this.$refs.buttonClick1.className.replace('ButtonJoin', '')
            this.$refs.buttonClick1.className += ' ButtonCancel'
            this.$refs.buttonClick1.dataset.action = 'cancel'
            // request to cancel room has succeeded. Now revert back to join room
          } else if (action === 'cancel_room') {
            this.$refs.buttonClick1.textContent = 'Tham gia'
            this.$refs.buttonClick1.className = this.$refs.buttonClick1.className.replace('ButtonCancel', '')
            this.$refs.buttonClick1.className += ' ButtonJoin'
            this.$refs.buttonClick1.dataset.action = 'join'
          }
        }
      })
    }
  },
  created () {
    if (this.$route.params.roomId === 'all') {
      this.inRoomManage = true
    }
  }
}
</script>
