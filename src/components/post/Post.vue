<template>
  <div style="margin-top:10px;">
    <div class="post-icon">
      <div class="material-div material-div-active">
        <a href="#" v-on:click.prevent="">
          <div class="material-turquoise">
            <i class="fa fa-edit icon"></i>
          </div>
          <span>Chia sẻ trạng thái</span>
        </a>
      </div>
      <div class="material-div">
        <a href="#" v-on:click.prevent="">
          <div class="material-red">
            <i class="fa fa-flash icon"></i>
          </div>
          <span>Tạo hoạt động</span>
        </a>
      </div>
    </div>
    <div class="post" :class="{'post-focus': post_active}" >
      <form method="post" enctype="multipart/form-data">
        <div class="p-u-status">
          <textarea name="status" id="status" rows="1" placeholder="Bạn đang có điều gì muốn chia sẻ ?" style="overflow-y:hidden;" 
            v-on:input="textKeyup" 
            v-model.trim="form.textarea" 
            v-on:focus="post_active = !post_active" 
            v-on:focusout="post_active = !post_active"></textarea>
          <transition name="fadef">
            <div class="p-friend" v-if="showFriends">
              <div v-if="friends" style="margin:10px 0px;" class="sf-fr">
                <div v-for="friend in friends">
                  <img :src="friend.friend.profileimage">
                  <span @click="deleteFriendIds(friend)">&#10799;</span>
                </div>
              </div>
              <input type="text" placeholder="Tên bạn bè" @keyup.prevent="searchFriend">
              <div class="dropdown">
                <div class="dropdown-menu" ref="dropdownMenu">
                  <div v-for="f in friendsAjax" class="p-ajax-fr" @click="addFriendIds(f)">
                    <img :src="f.friend.profileimage">
                    <span class="_lm">{{ f.friend.fullname }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div class="p-reaction" v-if="showReaction">
            <input type="text" v-model.trim="form.reaction" placeholder="Tên cảm xúc tối đa không quá 30 kí tự" />
          </div>
          <div class="p-img" v-if="images">
            <template v-for="image in images">
              <div class="p_img_in" @mouseenter="image.image_hover = true" @mouseleave="image.image_hover = false">
                <div class="_pimage" :class="{_pimage_hover: image.image_hover}">
                  <img :src="image.image_url">
                </div>
                <span class="_pcl" @click="imageClose(image.image_id)" v-show="image.image_hover" @mouseenter="image.image_hover = true">&#10799;</span>
              </div>
            </template>
          </div>
        </div>
        <div class="p-options">
          <div title="Thêm hình ảnh" style="cursor:pointer;">
            <label style="cursor:pointer;">
              <i class="icon fa fa-camera icon-orange"></i>
              <input type="file" accept="image/*" style="display:none;" @change="inputImageChange">
            </label>
          </div>
          <div title="Gắn thẻ bạn bè" style="cursor:pointer;" @click="friendTag">
            <i class="icon fa fa-user-o icon-wet"></i>
          </div>
          <div title="Tạo cảm xúc riêng" style="cursor:pointer" @click="reactionCreate">
            <i class="icon fa fa-heart-o"></i>
          </div>
          <div class="options-right">
            <div class="option-right2">
              <div class="dropdown">
                <!--
                <i class="fa fa-link"></i>
                <span class="_lm">Bạn bè</span>
                <i class="fa fa-angle-down _lm"></i>
                <div class="dropdown-menu">
                </div>
                -->
              </div>
            </div>
            <div class="option-right1">
              <button type="submit" @click.prevent="formSubmit">
                <span>Đăng bài</span>
                <i class="icon fa fa-angle-right _lm"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { UPLOAD_IMAGE, POST_SUBMIT, FRIEND_TAGGING } from '../../api/api.js'
import querystring from 'query-string'
export default {
  data () {
    return {
      form: {
        textarea: '',
        images_id: [],
        friendIds: [],
        reaction: ''
      },
      images: [],
      friends: [],
      friendsAjax: [],
      post_active: false,
      showFriends: false,
      showPrivacy: false,
      showReaction: false
    }
  },
  computed: {
    profileimage () {
      return this.$store.getters['user/getProfileImage']
    },
    showfr () {
    }
  },
  methods: {
    serialize (obj) {
      var str = []
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      }
      return str.join('&')
    },
    textKeyup (e) {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollHeight + 'px'
    },
    imageClose (imageId) {
      this.form.images_id = this.form.images_id.filter(function (obj) {
        if (obj !== imageId) return true
        else return false
      })
      this.images = this.images.filter(function (obj) {
        if (obj.image_id !== imageId) return true
        else return false
      })
    },
    reactionCreate () {
      this.showReaction = true
    },
    inputImageChange (e) {
      var that = this
      var f = new FormData()
      f.append('image', e.target.files[0])
      this.$http({
        method: 'POST',
        baseURL: UPLOAD_IMAGE,
        data: f,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.data.status_type === 'ok') {
          that.images.push({
            image_url: response.data.photo_url,
            image_id: response.data.photo_id,
            image_hover: false
          })
          that.form.images_id.push(
            response.data.photo_id
          )
        }
      })
    },
    formSubmit () {
      if (this.form.textarea === '' || (this.showReaction === true && this.form.reaction.length > 30)) return false
      var that = this
      this.$http({
        method: 'POST',
        baseURL: POST_SUBMIT,
        data: querystring.stringify(this.form),
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      }).then(function (response) {
        if (response.data.status_code === 'ok') {
          that.form.textarea = ''
          that.form.images_id = []
          that.images = []
          that.friends = []
          that.form.friendIds = []
          that.showFriends = false
          that.showReaction = false
          that.$store.commit('newfeed/prependStatus', response.data.data[0])
        } else {
          alert('Có lỗi xảy ra vui lòng xin tải lại trang')
        }
      })
    },
    friendTag () {
      this.showFriends = !this.showFriends
    },
    searchFriend (e) {
      var name = e.target.value
      this.friendsAjax = []
      var that = this
      if (name.trim() !== '') {
        this.$http({
          method: 'GET',
          baseURL: FRIEND_TAGGING,
          params: {
            name: name,
            friendIds: this.form.friendIds
          },
          paramsSerializer: function (params) {
            return querystring.stringify(params)
          },
          withCredentials: true
        }).then(function (response) {
          if (response.data.status_code === 'ok') {
            response.data.friends.forEach(function (e) {
              that.friendsAjax.push(e)
            })
            if (that.friendsAjax.length > 0) that.$refs.dropdownMenu.style.display = 'block'
            else that.refs.dropdownMenu.style.display = 'none'
          } else {
            alert('Có lỗi xảy ra vui lòng xin tải lại trang')
          }
        })
      }
    },
    addFriendIds (f) {
      // this.friendsAjax = this.friendsAjax.filter(function (e) {
        // return e.friend.id !== f.friend.id
      // })
      this.friendsAjax = []
      this.friends.push(f)
      this.form.friendIds.push(f.friend.id)
    },
    deleteFriendIds (f) {
      this.friends = this.friends.filter(function (e) {
        return e.friend.id !== f.friend.id
      })
      this.form.friendIds.splice(this.form.friendIds.indexOf(f.friend.id), 1)
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/post/post.scss';
</style>
