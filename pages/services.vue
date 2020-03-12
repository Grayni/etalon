<template lang="pug">
  .services
    app-services-proposal
    app-services-rendering
    app-services-prices
    app-services-questionnaire(v-if="width>789")
    app-services-info

    // app-services-info
</template>

<script>
import AppServicesProposal from '~/components/main/pages_sections/services/ServicesProposal'
import AppServicesRendering from '~/components/main/pages_sections/services/ServicesRendering'
import AppServicesPrices from '~/components/main/pages_sections/services/ServicesPrices'
import AppServicesQuestionnaire from '~/components/main/pages_sections/services/ServicesQuestionnaire'
import AppServicesInfo from '~/components/main/pages_sections/services/ServicesInfo'

import {widthWatch} from '~/plugins/mixins'

export default {
  head: {
    title: `Услуги | ${process.env.appName}`
  },
  mixins: [widthWatch],
  components: {
    AppServicesProposal,
    AppServicesRendering,
    AppServicesPrices,
    AppServicesQuestionnaire,
    AppServicesInfo
  }
}
</script>

<style lang="stylus" scoped>
.el-row
  width 100%
</style>
