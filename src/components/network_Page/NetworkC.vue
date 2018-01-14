<template>
  <div class="row">
    <header-comp></header-comp>
    <form class="worldRegisterForm" method="post" enctype="multipart/form-data" autocomplete="off">
      <legend>Thông tin cơ bản</legend>
      <div class="form-group">
        <div class="pre_name">Ảnh đại diện</div>
        <input type="file" accept="image/*" @change="inputImageChange">
      </div>
      <div v-if="images.length > 0" class="form-group">
        <template v-for="image in images">
          <img :src="image.imageUrl" width="150px" height="auto">
        </template>
      </div>
      <div v-if="error.imageId" class="form-group nError">
        <p> {{ error.imageId }}</p>
      </div>
      <div class="form-group">
        <div class="pre_name">Họ và tên</div>
        <input type="text" class="name" v-model="user.fullname" placeholder="Họ và tên nhỏ hơn 30 kí tự" maxlength="20">
      </div>
      <div v-if="error.fullname" class="form-group nError">
        <p> {{ error.fullname }}</p>
      </div>
      <div class="form-group">
        <div class="pre_name">Giới tính</div>
        <input type="radio" class="sex" v-model="user.sex" id="sexm" name="sex" value="male">
        <label for="sexm">Nam</label>
        <input type="radio" class="sex" v-model="user.sex" id="sexf" name="sex" value="female">
        <label for="sexf">Nữ</label>
      </div>
      <div v-if="error.sex" class="form-group nError">
        <p> {{ error.sex }}</p>
      </div>
      <div class="form-group">
        <div class="pre_name">Năm sinh</div>
        <div style="display:inline-block;">
          <select v-model="user.bornYear" name="bornYear">
            <option value=''>Chọn năm sinh</option>
            <option v-for="i in allowBornYear" :value="i">{{i}}</option>
          </select>
        </div>
      </div>
      <div v-if="error.bornYear" class="form-group nError">
        <p> {{ error.bornYear }}</p>
      </div>
      <div class="form-group">
        <label class="pre_name">Quốc tịch</label>
        <div style="display:inline-block;">
          <div class="dropdown">
            <div class="select-country-box" @click="dropdownShow">
              <template v-if="chosenCountry === undefined">
                <span>Quốc tịch</span>
                <span class="fa fa-chevron-down" style="float:right;line-height:30px"></span>
              </template>
              <template v-else>
                <div class="_fl1aa">
                  <img :src="chosenCountry.flag24" width="24px" height="24px">
                  <span>{{chosenCountry.name}}</span>
                </div>
              </template>
            </div>
            <div class="dropdown-menu" ref="dropdownMenu">
              <div class="_fl1aa" v-for="country in countries" :data-code="iso2" @click.prevent="countryClick(country)">
                <img :src="country.flag24" width="24px" height="24px">
                <span>{{country.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="error.countryCode" class="form-group nError">
        <p> {{ error.countryCode }}</p>
      </div>
      <div class="form-group">
        <button type="submit" class="btn" style="padding:10px;background-color:#005a82;color:#fff" @click.prevent="formSubmit">Tham gia</button>
      </div>
    </form>
  </div>
</template>
<script>
import country from '../../helpers/country.js'
import { UPLOAD_IMAGE, NETWORK_REGISTER } from '../../api/api.js'
import dropdown from '../../helpers/dropdown.js'
import querystring from 'query-string'
import Header from './Header.vue'
import auth from '../../auth/auth.js'
export default {
  data () {
    return {
      user: {
        fullname: '',
        sex: '',
        countryCode: '',
        bornYear: '',
        imageId: ''
      },
      error: {
        fullname: '',
        sex: '',
        countryCode: '',
        bornYear: '',
        imageId: ''
      },
      chosenCountry: undefined,
      allowBornYear: [],
      images: []
    }
  },
  created () {
    for (var i = 1900; i <= new Date().getFullYear(); i++) {
      this.allowBornYear.push(i)
    }
  },
  methods: {
    dropdownShow (e) {
      e.stopPropagation()
      dropdown.closeOtherDropdowns()
      this.$refs.dropdownMenu.style.display = 'block'
    },
    countryClick (country) {
      this.chosenCountry = country
      this.user.countryCode = country.iso2
    },
    inputImageChange (e) {
      var that = this
      var f = new FormData()
      f.append('image', e.target.files[0])
      f.append('imageType', 'network_profileimage')
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
          that.images = []
          that.images.push({
            imageUrl: response.data.photo_url,
            imageId: response.data.photo_id,
            imageHover: false
          })
          that.user.imageId = response.data.photo_id
        }
      })
    },
    checkSubmit () {
      this.error = {
        fullname: '',
        sex: '',
        countryCode: '',
        bornYear: '',
        imageId: ''
      }
      if (this.user.fullname === '') {
        this.error.fullname = 'Xin hãy điền tên của bạn'
      }
      if (this.user.bornYear === '') {
        this.error.bornYear = 'Xin hãy chọn năm sinh'
      }
      if (this.user.imageId === '') {
        this.error.imageId = 'Xin hãy tải ảnh đại diện của bạn lên'
      }
      if (this.user.countryCode === '') {
        this.error.countryCode = 'Hãy chọn quốc tịch của bạn'
      }
      if (this.user.sex === '') {
        this.error.sex = 'Hãy chọn giới tính của bạn'
      }
    },
    formSubmit (e) {
      this.checkSubmit()
      if (this.user.fullname === '' || this.user.bornYear === '' || this.user.imageId === '' || this.user.fullname === '' || this.user.sex === '') return false
      this.$http({
        method: 'POST',
        baseURL: NETWORK_REGISTER,
        data: querystring.stringify(this.user),
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      }).then(function (response) {
        var re = JSON.parse(response.data.replace('while(1);', ''))
        console.log(re)
        if (re.status_code === 'ok') {
          window.location.href = '/network'
        } else {
          alert('Có lỗi xảy ra vui lòng xin tải lại trang')
        }
      })
    }
  },
  computed: {
    countries () {
      return country.countryCode
    }
  },
  components: {
    headerComp: Header
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
