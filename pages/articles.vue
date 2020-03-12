<template lang="pug">
  .famous-wrap
    el-row(type="flex", justify="center")
      el-col(:xs="23", :sm="14", :md="16", :lg="12")
        app-article(v-for="article in articles" :key="article._id" :article="article")
        
</template>

<script>
import AppArticle from '@/components/main/Article'
export default {
  head: {
    title: `Статьи | ${process.env.appName}`
  },
  components: {
    AppArticle
  },
  async asyncData({store}) {
    const articles = await store.dispatch('articles/fetch')
    return {articles}
  }
}
</script>

<style lang="stylus" scoped>
</style>
