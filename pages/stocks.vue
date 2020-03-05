<template lang="pug">
  .stocks
    app-benefits
</template>

<script>
import AppBenefits from '~/components/main/pages_sections/stocks/Benefits'
export default {
  head: {
    title: 'Акции'
  },
  components: {
    AppBenefits
  }
}
</script>

<style lang="stylus" scoped>
.el-row
  min-height 100vh
  display flex
  justify-content center
  align-items center
  border-bottom 1px solid #222
</style>
