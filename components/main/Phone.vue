<template lang="pug">
  .phone
    slot-add-phone(v-for="code in codes" :key="code" :phone="code")
      |{{code}}
</template>
<script>
import SlotAddPhone from '~/components/slots/AddPhone'
export default {
  props: ['phone'],
  components: {
    SlotAddPhone
  },
  data() {
    return {
      codes: ['921']
    }
  },
}
</script>
<style lang="stylus" scoped>
  .phone
    font 18px 'h'
</style>