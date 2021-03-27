<template lang="pug">
  .services
    app-services-proposal
    app-services-rendering
    app-services-rates(:rates="rates")
    app-services-price(:tables="tables")
    app-services-questionnaire(v-if="width>789")
    app-services-physics

    // app-services-info
</template>

<script>
import AppServicesProposal from '~/components/main/pages_sections/services/ServicesProposal'
import AppServicesRendering from '~/components/main/pages_sections/services/ServicesRendering'
import AppServicesRates from '~/components/main/pages_sections/services/ServicesRates'
import AppServicesPrice from '~/components/main/pages_sections/services/ServicesPrice'
import AppServicesQuestionnaire from '~/components/main/pages_sections/services/ServicesQuestionnaire'
import AppServicesPhysics from '~/components/main/pages_sections/services/ServicesPhysics'

import {widthWatch} from '~/plugins/mixins'

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
          content: 'стоимость бухгалтерских услуг, бухгалтерские услуги стоимость, стоимость бухгалтерских услуг по Спб'
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
  mixins: [widthWatch],
  components: {
    AppServicesProposal,
    AppServicesRendering,
    AppServicesRates,
    AppServicesPrice,
    AppServicesQuestionnaire,
    AppServicesPhysics
  },
  async asyncData({store}) {
    const rates = await store.dispatch('rates/fetch')
    let tables = await store.dispatch('tables/fetch')
    tables = tables.filter(x => x.present === true)
    return {rates, tables}
  },
  data() {
    return {
      meta: {
        title: 'Стоимость бухгалтерских услуг',
        description: 'Стоимость бухгалтерских услуг - это один из самых волнующих вопросов наших клиентов. И мы приятно удивляем нашей прозрачной политикой в недорогом ценообразовании.'
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.el-row
  width 100%
</style>
