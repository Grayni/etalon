<template lang="pug">
  .wrap-analytics
    h1 Анализ данных
    .wrap-canvas
      app-analytics-chart(:labels="comments.labels" :data="comments.data" title="Количество комментариев")
    .wrap-canvas
      app-analytics-chart(:labels="views.labels" :data="views.data" title="Количество просмотров")
</template>

<script>
import AppAnalyticsChart from '@/components/admin/AnalyticsChart'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  components: {
    AppAnalyticsChart
  },
  head: {
    title: `Аналитика | ${process.env.appName}`
  },
  async asyncData({store}) {
    const {views, comments} = await store.dispatch('articles/getAnalytics')
    return {views, comments}
  }
}
</script>

<style lang="stylus" scoped>
.wrap-canvas
  margin-bottom 50px
</style>
