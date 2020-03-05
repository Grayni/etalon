<template lang="pug">
  .famous-wrap
    el-row(type="flex", justify="center")
      el-col(:xs="23", :sm="14", :md="16", :lg="12")
        app-article(v-for="article in 3" :key="article")
        
</template>

<script>
import AppArticle from '@/components/main/Article'
export default {
  head: {
    title: 'Статьи'
  },
  components: {
    AppArticle
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
