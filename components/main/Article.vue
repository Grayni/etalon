<template lang="pug">
  el-card.article(
    shadow="hover"
    :body-style="{padding: 0}"
  )
    header.article-header(slot="header")
      h3.article-title(@click="openArticle") {{article.title}}
      small
        i.el-icon-time
        |  {{ article.date | date('date') }}
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
      const id = this.article._id
      this.$router.push(`/article/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.article
  margin-bottom 1.5rem
  background #252525
  color #fffdec
  &-header
    display flex
    justify-content space-between
    align-items center
  &-title
    margin 0
    cursor pointer
    &:hover
      color #dcbc96
  &-img
    width 100%
    height auto
    &-wrap
      position relative
      img
        max-height 30vh
  &-shadow
    width 100%
    height calc(100% - 3px)
    box-shadow inset 0 0 10px 10px rgba(0,0,0,.2)
    position absolute
    top 0
    left 0
    z-index 12
  &-footer
    display flex
    justify-content space-between
    align-items center
    padding 1rem
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
