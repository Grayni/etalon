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
  head: {
    title: `Услуги | ${process.env.appName}`,
    meta: [{
      hid: 'service-description', name: 'description', content: 'Такие цены на бухгалтерское сопровождение в Спб есть только у нас! Все как на ладони! ЦБО Эталон рекомендует.'
    }]
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
  }
}
</script>

<style lang="stylus" scoped>
.el-row
  width 100%
</style>
