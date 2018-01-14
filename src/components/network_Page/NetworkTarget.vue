<template>
  <div class="row">
    <button class="btn" role="button" @click="clickButton1">Quay trở về</button>
    <button class="btn" role="button" @click="clickButton2">Tạo mục đích tham gia</button>
    <div v-if="showGoal">
      <div>
        <p style="width:50%;margin:20px 0;">Mục đích kết bạn của bạn là gì? Chằng hạn bạn muốn cải thiện trình độ ngoại ngữ của mình, bạn nên chọn mục đích là "ngoại ngữ". Hay bạn muốn kết bạn để cùng tham gia thể thao, hãy chọn mục thể thao. Mỗi mục như trên sẽ có phần miêu tả để bạn nói giới thiệu về mình cho cả thế giới biết! Chúng tôi sẽ cập nhật thêm nhiều phần trong thời gian sắp tới</p>
        <p style="width:50%;margin:20px 0;">Nếu bạn thấy chúng tôi chưa có mục đích phù hợp với bạn, hãy liên hệ admin@lifelead.net để yêu cầu. Chúng tôi sẽ cập nhật trong vòng 1 tiếng sau khi nhận được mail của các bạn.</p>
        <select name="goal" :value="form.goal" @input="goalChange">
          <option value="">Chọn mục đích tham gia</option>
          <option value="sport">Thể thao</option>
          <option value="language">Ngoại ngữ</option>
        </select>
      </div>
      <div class="goal-sport clearfix" v-if="showSport">
        <div class="col" v-for="sport in goalSportList">
          <goalItem :item="sport" v-model="form.selectGoal" name="sport" :key="sport"></goalItem>
        </div>
      </div>
      <div class="goal-language clearfix" v-if="showLanguage">
        <div class="col" v-for="i in goalLanguageList">
          <goalItem :item="i" v-model="form.selectGoal" name="language" :key="i"></goalItem>
        </div>
      </div>
      <div class="text-goal">
        <textarea placeholder="Giới thiệu về bạn cho cả thế giới biết. Hãy dùng đúng ngôn ngữ khi muốn kết bạn với người nước ngoài." rows="5" v-model="form.introduction" spellcheck="false"></textarea>
      </div>
    </div>
    <div class="gg_error" v-if="showError">
      Hãy điền đầy đủ thông tin trước khi khởi tạo
    </div>
    <div v-if="showGoal">
      <button class="btn btn_net" role="button" @click="clickButton3">Khởi tạo</button>
    </div>
    <div v-if="!showGoal">
      <template v-if="allGoals.length == 0">
        <p>Bạn hiện tại chưa có mục đích tham gia.</p> 
        <p>Tạo mới và tham gia</p> 
      </template>
      <template v-else>
        <div v-for="i in allGoals" class="goalItem">
          <p>{{ i.goal | languageFilter }}</p>
          <p>{{ i.selectGoal | languageFilter }}</p>
          <p>{{ i.introduction }}</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { sportList, languageList } from '../../helpers/network-goal-list.js'
import { NETWORK_GOAL } from '../../api/api.js'
import GoalItem from './GoalItem.vue'
import querystring from 'query-string'
import { Mixin } from './Mixin.js'
export default {
  data () {
    return {
      showGoal: false,
      showSport: false,
      showLanguage: false,
      showError: false,
      form: {
        introduction: '',
        goal: '',
        selectGoal: ''
      }
    }
  },
  mixins: [Mixin],
  methods: {
    clickButton1 () {
      window.location.href = '/network'
    },
    clickButton2 () {
      this.showGoal = true
    },
    clickButton3 () {
      if (this.form.introduction === '' || this.form.goal === '' || this.form.selectGoal === '') return false
      var data = {
        introduction: this.form.introduction,
        goal: this.form.goal,
        select_goal: this.form.selectGoal,
        type: 'create'
      }
      this.$http({
        method: 'POST',
        baseURL: NETWORK_GOAL,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: querystring.stringify(data),
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        withCredentials: true
      }).then(function (response) {
        var re = JSON.parse(response.data.replace('while(1);', ''))
        if (re.status_code === 'ok') {
          window.location.replace('/network')
        }
      }).catch(function (response) {
        alert('Đã có lỗi xảy ra. Vui lòng thử lại')
      })
    },
    resetShowGoal () {
      this.showSport = false
      this.showLanguage = false
    },
    goalChange (e) {
      this.resetShowGoal()
      let v = e.target.value
      this.form.goal = v
      if (v === 'sport') {
        this.showSport = true
      } else if (v === 'language') {
        this.showLanguage = true
      }
    }
  },
  computed: {
    goalSportList () {
      return sportList.sportList
    },
    goalLanguageList () {
      return languageList
    },
    allGoals () {
      return this.$store.getters['network/getGoals']
    },
    sportGoals () {
      return this.allGoals.filter(e => {
        return e.goal === 'sport'
      })
    },
    languageGoals () {
      return this.allGoals.filter(e => {
        return e.goal === 'language'
      })
    }
  },
  components: {
    goalItem: GoalItem
  },
  created () {
    this.$store.dispatch('network/fetchGoals')
  }
}
</script>
