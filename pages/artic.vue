<template lang="pug">
  .famous-wrap
    el-row(type="flex", justify="center")
      el-col(:xs="23", :sm="14", :md="20", :lg="18")
        app-article(v-for="article in articles" :key="article._id" :article="article")

</template>

<script>
import AppArticle from '@/components/main/Article'
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
          content: 'статьи по бухгалтерскому обслуживанию, краткие обзоры по бухгалтерскому сопровождению'
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
  layout: 'default',
  components: {
    AppArticle
  },
  data() {
    return {
      meta: {
        title: 'Статьи по бухгалтерскому обслуживанию',
        description: 'Статьи по бухгалтерскому учету от компании «ЦБО Эталон» помогут всем, кто хочет совершенствовать свои знания и разбираться в данной области.'
      }
    }
  },
  async asyncData({store}) {
    const articles = await store.dispatch('articles/fetch')
    return {articles}
  }
}
</script>

<style lang="stylus" scoped>
.famous-wrap
  background #373737
</style>
