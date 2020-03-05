<template lang="pug">
  .head-info
    el-row
      el-col(:sm="12" :span="24")
        app-address
      el-col(:sm="12" :span="24")
        app-phone.phone-block
</template>
<script>
import AppPhone from '~/components/main/Phone'
import AppAddress from '~/components/main/Address'
export default {
  components: {
    AppPhone,
    AppAddress
  }
}
</script>
<style lang="stylus" scoped>
.head-info
  height 50px
  padding 18px 1rem
  @media (max-width 439px)
    margin-top 20px
    padding 1rem 0
  @media (max-width 767px)
    .phone-block
      margin-top 20px
</style>