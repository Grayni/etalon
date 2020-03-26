<template lang="pug">
  el-card.article(
    shadow="hover"
    :body-style="{padding: 0}"
  )
    header.article-header(slot="header")
      h3.article-title(@click="openArticle") {{article.title}} на {{ article.date | date('year') }} год

    .article-body
      .article-img-wrap
        img.article-img(:src="`/articles${article.imageUrl}`")
        span.article-shadow
    footer.article-footer
      el-button.read(
        @click="openArticle"
        type="primary"
      )
        span Читать
        i.el-icon-arrow-right
      span
        i.el-icon-view
        |  {{article.views}}
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    openArticle() {
      const chpu = this.article.chpu
      this.$router.push(`/article/${chpu}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.article
  margin-bottom 1.5rem
  background #252525
  color #fffdec
  border none
  &-header
    display flex
    justify-content space-between
    align-items center
  &-title
    margin 0
    cursor pointer
    &:hover
      color #dcbc96
  &-body
    background #fffdec
    width 100%
  &-img
    width 100%
    &-wrap
      position relative
      background #fff
      display flex
      justify-content center
      img
        max-height 400px
        width auto
        margin 20px 0
  &-shadow
    width 100%
    height 100%
    // box-shadow inset 0 0 10px 10px rgba(0,0,0,.2)
    position absolute
    top 0
    left 0
    z-index 12
  &-footer
    display flex
    justify-content space-between
    align-items center
    padding 1rem
    width 100%
.read
  background transparent
  border-color #fffdec
  color #fffdec
  font-size 14px
  letter-spacing 2px
  &:hover
    border-color #dcbc96
    color #dcbc96
</style>
