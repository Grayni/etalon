<template lang="pug">
  .index
    app-main
    app-company
    app-calculator(:calculates="calculates")
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
  layout: (ctx) => ctx.isMobile ? 'mobile' : 'default',
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
          content: 'оказание бухгалтерских услуг, предоставление бухгалтерских услуг, предоставление бухгалтерских услуг в Санкт-Петербурге'
        },
        {
          name: 'google-site-verification',
          content: '3cukbRhW5LSn_9F1KGkerx19QaUjZEMYHSytC2w2Gcw'
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
          hid: `og:image-${this.$route.name}`,
          name: 'og:image',
          content: `${process.env.baseUrl}/first.jpg`
        },
        {
          hid: `og:url-${this.$route.name}`,
          name: 'og:url',
          content: process.env.baseUrl
        }
      ],
      link: [
        {
          hid: `${this.$route.name}-canonical`,
          rel: 'canonical',
          href: process.env.baseUrl
        }
      ]
    }
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
  },
  data() {
    return {
      meta: {
        title: 'Предоставление бухгалтерских услуг',
        description: 'Предоставление бухгалтерских услуг по Санкт-Петербургу и России. Индвидуальный подход к каждому клиенту! Скидки и акции. ЦБО Эталон рекомендует.'
      }
    }
  },
  async asyncData({store}) {
    let calculates = await store.dispatch('tables/fetch')
    return {calculates}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path === '/') {
        vm.$store.commit('changeMainPage', true)
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('changeMainPage', false)
    next()
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
