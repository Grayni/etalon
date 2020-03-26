<template lang="pug">
  .stocks
    app-benefits
</template>

<script>
import AppBenefits from '@/components/main/pages_sections/stocks/Benefits'
export default {
  head: {
    title: `Акции | ${process.env.appName}`,
    meta: [{
      hid: 'stocks-description', name: 'description', content: 'Акции на бухгалтерское сопровождение от компании ЦБО Эталон. Месяц бесплатно, ведение кадрового учета до 3-х сотрудников бесплатно и многое другое!'
    }]
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
