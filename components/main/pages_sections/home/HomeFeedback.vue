<template lang="pug">
  .requis-wrap
    app-logo-background(v-if="$device.isDesktop")
    el-row.requis
      el-col.requisites-wrap(:xs="24" :span="12")
        .send-wrap
          h2.gray Реквизиты
        app-contacts-requisites.send
      el-col.questions(:xs="24" :span="12")
        .send-wrap
          h2.gray Задать вопрос
        app-contacts-form-send.send
</template>
<script>
import AppLogoBackground from '@/components/main/LogoBackground'
import AppContactsRequisites from '@/components/main/pages_sections/contacts/ContactsRequisites'
import AppContactsFormSend from '@/components/main/pages_sections/contacts/ContactsFormSend'
export default {
  components: {
    AppLogoBackground,
    AppContactsRequisites,
    AppContactsFormSend
  }
}
</script>
<style lang="stylus" scoped>
.requis-wrap
  overflow hidden
  position relative
  background #252525
  display flex
  align-items center
  min-height 100vh
.el-row
  display flex
  justify-content center
  align-items center
  @media (max-width 767px)
    flex-direction column
  &.requis
    display flex
    align-items stretch
    width 100%
    padding-top 40px
    .el-col
      flex 1 1 auto
      @media (max-width 767px)
        padding 0 10px
.requisites-wrap
  padding-left 2vw
  h2
    color rgb(184, 184, 184)
.questions
  padding-right 2vw
  display flex
  align-items stretch
  justify-content stretch
  flex-direction column
  h2
    color rgb(184, 184, 184)

.send
  position relative
  z-index 0
  padding 90px 20px
  top -40px
  flex 1 1 auto
  @media (max-width 767px)
    margin 0
  @media (max-width 600px)
    padding 60px 20px 40px 20px
  &-wrap
    display flex
    align-items center
    justify-content flex-end
</style>
