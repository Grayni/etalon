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
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: `description-${this.$route.name}`,
          name: 'description',
          content: this.meta.description
        },
        {
          hid: `keywords-${this.$route.name}`,
          name: 'keywords',
          content: 'контакты ЦБО Эталон, расположение офиса, номер телефона ЦБО Эталон, ЦБО Эталон на карте'
        },
        {
          hid: `og:title-${this.$route.name}`,
          name: 'og:title',
          content: this.meta.title
        },
        {
          hid: `og:description-${this.$route.name}`,
          name: 'og:description',
          content: this.meta.description
        },
        {
          hid: `og:url-${this.$route.name}`,
          name: 'og:url',
          content: process.env.baseUrl + this.$route.path
        }
      ],
      link: [
        {
          hid: `canonical-${this.$route.name}`,
          rel: 'canonical',
          href: process.env.baseUrl + this.$route.path
        }
      ]
    }
  },
  components: {
    AppYaMap,
    AppContactsData,
    AppFeedback
  },
  data() {
    return {
      meta: {
        title: 'Контакты и расположение офиса',
        description: 'Информация о компании ЦБО «Эталон» - адреса, время работы и удаленность офиса от метро'
      }
    }
  }
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
  @media (max-width 767px)
    padding-top 40px
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
</style>
