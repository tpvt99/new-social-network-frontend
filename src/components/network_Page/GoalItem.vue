<template>
  <div class="goalTargetDiv">
    <div>
      <img :src="item.image">
    </div>
    <div class="_fl1">
      <input type="radio" :value="item.value" :id="item.value" :name="name" @click="inputClick">
      <label :for="item.value" class="_lm">{{ item.vnName }}</label>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item', 'value', 'name'],
  methods: {
    inputChange (e) {
      this.$emit('input', e.target.value)
    },
    inputClick (e) {
      this.$emit('input', e.target.value)
    }
  },
  computed: {
  }
}
</script>
