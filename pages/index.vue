<template lang="pug">
  .index
    app-main
    app-company
    app-calculator
    app-offers
    app-offers2
    app-become
    app-need
    app-feedback
</template>

<script>
import AppMain from '@/components/main/pages_sections/home/HomeMain'
import AppCompany from '@/components/main/pages_sections/home/HomeCompany'
import AppCalculator from '@/components/main/pages_sections/home/HomeCalculator'
import AppOffers from '@/components/main/pages_sections/home/HomeOffers'
import AppOffers2 from '@/components/main/pages_sections/home/HomeOffers2'
import AppBecome from '@/components/main/pages_sections/home/HomeBecome'
import AppFeedback from '@/components/main/pages_sections/home/HomeFeedBack'
import AppNeed from '@/components/main/pages_sections/home/HomeNeed'
import AppContactsFormSend from '@/components/main/pages_sections/contacts/ContactsFormSend'
export default {
  head: {
    title: 'Главная'
  },
  components: {
    AppMain,
    AppCompany,
    AppCalculator,
    AppOffers,
    AppOffers2,
    AppBecome,
    AppNeed,
    AppFeedback
  }
}
</script>

<style lang="stylus" scoped>
.el-row.piece
  min-height 100vh
  display flex
  justify-content center
  align-items center
  border-bottom 1px solid #222
  
</style>
