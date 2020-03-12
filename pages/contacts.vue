<template lang="pug">
  .famous-wrap
    el-row.map
      el-col(:span="24")
        el-row.first-in
          el-col.map-block(:xs="24" :md="15" :span="12")
            app-ya-map
          el-col.contact-block(:xs="24" :md="9" :span="12")
            .contacts-wrap-data
              app-contacts-data
    app-feedback
</template>

<script>
import AppYaMap from '~/components/main/pages_sections/contacts/maps'
import AppContactsData from '~/components/main/pages_sections/contacts/ContactsData'
import AppFeedback from '@/components/main/pages_sections/home/HomeFeedBack'
export default {
  head: {
    title: `Контакты | ${process.env.appName}`
  },
  components: {
    AppYaMap,
    AppContactsData,
    AppFeedback
  },
}
</script>

<style lang="stylus" scoped>
.map
  margin-bottom 20px
.el-row
  min-height 100vh
  display flex
  justify-content center
  align-items center

  &.requis
    display flex
    align-items stretch
    align-content center
    min-height auto
    width 100%
  &.first-in
    display flex
    align-items stretch
    align-content stretch
    @media (max-width 767px)
      flex-direction column
.map-block
  flex 1 1 auto
.contact-block
  flex 1 1 auto
.contacts-wrap-data
  display flex
  justify-content center
  align-items center
  height 100%
  background white
  margin-right 2vw

.requisites-wrap
  padding-left 2vw
  h2
    color rgb(184, 184, 184)
.questions
  padding-right 2vw
  h2
    color rgb(184, 184, 184)

.send
  position relative
  z-index 0
  top -44px
  &-wrap
    display flex
    align-items center
    justify-content flex-end
    .gray
      margin-right 2vw
      padding 0 20px 0 35px
</style>
