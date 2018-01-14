<template>
  <div>
    <div class="row">
      <button class="btn" role="button" @click="clickButton1">Quản lý mục đích</button>
    </div>
    <div class="div-network">
      <message></message>
      <template v-for="network in allNetworks">
        <section class="row section-network">
          <div class="section-header">
            <h2>{{ network.name | filterHeader }}</h2>
          </div>
          <div class="section-main">
            <template v-for="i in network.data">
              <div class="section-child col span-1-of-5">
                <people-network :key="i" :data="i"></people-network>
              </div>
            </template>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>
<script>
import PeopleNetwork from './components/PeopleNetwork.vue'
import Message from '../network_chat/Message.vue'
export default {
  methods: {
    clickButton1 () {
      this.$router.replace('network/goal')
    }
  },
  components: {
    peopleNetwork: PeopleNetwork,
    message: Message
  },
  filters: {
    filterHeader (e) {
      if (e === 'sport') {
        return 'Thể thao'
      } else if (e === 'language') {
        return 'Ngoại ngữ'
      }
    }
  },
  computed: {
    allNetworks () {
      return this.$store.getters['network/getAllNetworks']
    }
  },
  created () {
    this.$store.dispatch('network/fetchNetwork')
  }
}
</script>
