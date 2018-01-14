<template>
  <div>
    <section class="row section-networkNav">
      <button class="btn" @click="buttonClick" data-type="room">Tạo nhóm chat</button>
      <button class="btn" @click="buttonClick" data-type="topic">Tạo chủ đề chat</button>
      <button class="btn" @click="buttonClick" data-type="allRooms">Quản lý phòng chat</button>
    </section>
    <section class="row section-networkSearch">
      <div class="dropdown">
        <input type="text" placeholder="Tìm kiếm chủ đề giao lưu, trao đổi và học hỏi ..." :value="search_words" @input="searchInput">
        <div class="dropdown-menu searchList" ref="dropdownMenu">
          <template v-for="list in search_list">
            <div class="_topicItem">
              <a :href="'/network/chatroom/topic/' + list.url" class="_cl_inherit">
                <span style="color:#999;">Chủ đề</span>
                <span class="_lm">{{ list.name }}</span>
              </a>
            </div>
          </template>
          <div class="_topicItem" v-if="search_words !== ''">
            <p>
              <a :href="'/network/chatroom/search?topic=' + search_words" class="_cl_inherit">
                <span>Tìm kiếm thêm cho</span>
                <span class="_lm">{{ search_words }}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section-networkModal">
      <modal v-if="showModal" @close="showModal = false">
        <section slot="header" style="float: right;">
          <span class="fa fa-times" @click="closeModal" style="cursor:pointer;"></span>
        </section>
        <section slot="body">
          <template v-if="modalType === 'room'">
            <h3>Tạo nhóm chat</h3>
            <input type="text" placeholder="Tên phòng chat" v-model.trim="chatroomName" class="_inputTopicCreate" style="width:400px">
            <textarea rows="3" v-model.trim="chatroomDescription" class="_inputTopicCreate" placeholder="Nội dung cơ bạn mà phòng chat của bạn sẽ hướng đến" style="width:400px;resize:none;margin:10px 0;"></textarea>
            <div class="dropdown" style="margin-top:10px;width:400px">
              <input type="text" placeholder="Tag ít nhất 1 chủ đề liên quan đến nội dung chat" @input="tagChatroomTopic" class="_inputTopicCreate" style="width:100%;">
              <div class="dropdown-menu" ref="dropdownTopic" style="padding:5px;width:100%;">
                <template v-for="list in search_list">
                  <p :data-id="list.id" style="cursor:pointer;" @click="addTopicTag(list)">
                    {{ list.name }}
                  </p>
                </template>
              </div>
            </div>
            <div>
              <template v-for="list in tagTopicList">
                <p style="margin:5px 0;">
                  <span class="fa fa-times" @click="removeTopicTag(list)" style="cursor:pointer"></span>
                  <span>{{ list.name }}</span>
                </p>
              </template>
            </div>
            <button class="btn" @click="roomCreate" style="background-color:#3489db;margin: 5px 0;color:#fff;">Tạo nhóm</button>
          </template>
          <template v-else>
            <h3>Tạo chủ đề chat</h3>
            <p style="margin:10px 0;">Chủ đề chat do bạn tạo sẽ được mọi người khác dùng để tạo nhóm chat cho họ. Trước khi tạo hãy đọc kĩ các điều sau đây:</p>
            <ul>
              <li>Đặt tên liên quan đến các vấn đề xung quanh bạn như: tình yêu, thời trang, phim ảnh, khởi nghiệp, nhân vật công chúng...</li>
              <li>Không được đặt tên xúc phạm đến danh dự và nhân phẩm người khác</li>
              <li>Không được đặt tên liên quan đến các nội dung thô tục, bạo lực, khủng bố</li>
              <li>Không được đặt tên liên quan đến việc chống đối, phản động nhà nước và các tổ chức chính quyền của các quốc gia trên thế giới</li>
            </ul>
            <div style="margin: 10px 0;">
              <input type="text" placeholder="Tên chủ đề" v-model.trim="topic" class="_inputTopicCreate">
              <textarea type="text" placeholder="Miêu tả chủ đề" v-model.trim="topicDescription" class="_textTopicCreate"></textarea>
            </div>
            <button class="btn" style="background-color:#2980b9;color:#fff;border-radius:5px;" @click="topicCreate">Tạo chủ đề</button>
            <a href="javascript:void(0);" @click="showModal=false">Hủy bỏ</a>
          </template>
        </section>
      </modal>
    </section>
  </div>
</template>
<script>
import Modal from '../modalbox/Modal.vue'
export default {
  data () {
    return {
      search_words: '',
      search_list: [],
      showModal: false,
      modalType: '',
      topic: '',
      topicDescription: '',
      chatroomName: '',
      chatroomDescription: '',
      tagTopicList: [],
      tagTopicListId: []
    }
  },
  components: {
    modal: Modal
  },
  methods: {
    closeModal () {
      this.showModal = false
    },
    buttonClick (e) {
      var type = e.target.dataset.type
      if (type === 'allRooms') {
        this.$router.push('/network/chatroom/room/all')
      }
      this.modalType = type
      this.showModal = true
    },
    removeTopicTag (e) {
      this.tagTopicList = this.tagTopicList.filter(a => a !== e)
      this.tagTopicListId = this.tagTopicListId.filter(a => a !== e.id)
    },
    addTopicTag (e) {
      if (this.tagTopicListId.findIndex(a => a === e.id) !== -1) return
      this.tagTopicList.push(e)
      this.tagTopicListId.push(e.id)
    },
    roomCreate () {
      if (this.chatroomName === '' || this.tagTopicListId.length === 0 || this.chatroomDescription === '') {
        alert('Hãy điền đầy đủ 3 mục trên')
        return
      }
      let promise = new Promise((resolve, reject) => {
        var payload = {
          room_name: this.chatroomName,
          room_description: this.chatroomDescription,
          tag_topic_id: this.tagTopicListId,
          action: 'create_room',
          resolve: resolve,
          reject: reject
        }
        this.$store.dispatch('networkChatroom/createRoom', payload)
      })
      promise.then(e => {
        console.log(e)
        let roomId = e.data.room_id
        window.location.replace('/network/chatroom/room/' + roomId)
      })
    },
    topicCreate () {
      if (this.topic === '' || this.topicDescription === '') {
        alert('Điền thông tin vào 2 mục trên')
        return
      }
      let promise = new Promise((resolve, reject) => {
        var payload = {
          topic: this.topic,
          topicDescription: this.topicDescription,
          action: 'create_topic',
          resolve: resolve,
          reject: reject
        }
        this.$store.dispatch('networkChatroom/createTopic', payload)
      })
      promise.then(e => {
        if (e.status_code === 'ok') {
          window.location.href = '/network/chatroom/topic/' + e.topic_name
        }
      })
    },
    searchInput (e) {
      this.search_words = e.target.value.trim()
      if (this.search_words === '') {
        this.search_list = []
        return
      }
      let promise = new Promise((resolve, reject) => {
        var payload = {
          search: this.search_words,
          resolve: resolve,
          reject: reject,
          action: 'topic'
        }
        this.$store.dispatch('networkChatroom/searchTopic', payload)
      })
      promise.then(e => {
        this.search_list = e.data
        if (Array.isArray(this.search_list) && this.search_list !== []) {
          this.$refs.dropdownMenu.style.display = 'block'
        }
      })
    },
    tagChatroomTopic (e) {
      var value = e.target.value
      if (value.trim() === '') {
        this.search_list = []
        return
      }
      let promise = new Promise((resolve, reject) => {
        var payload = {
          search: value,
          action: 'topic',
          resolve: resolve,
          reject: reject
        }
        this.$store.dispatch('networkChatroom/searchTopic', payload)
      })
      promise.then(e => {
        this.search_list = e.data
        if (Array.isArray(this.search_list) && this.search_list !== []) {
          this.$refs.dropdownTopic.style.display = 'block'
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../../static/scss/network/chatroom.scss';
</style>
