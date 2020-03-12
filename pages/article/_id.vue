<template lang="pug">
  .famous-wrap
    article.article
      header.article-header
        .article-title
          h1 {{article.title}}
          nuxt-link(to="/articles")
            i.el-icon-back
        .article-info
          small
            i.el-icon-time
            |  {{ article.date | date('date') }}
          small
            i.el-icon-view
            |  {{article.views}}
        .article-image
          img(:src="`/articles${article.imageUrl}`")
      main.article-content
        vue-markdown {{article.text}}
      footer.article-footer
        app-logo-background
        .comments-wrap
          transition(name="hide-form")
            app-create-comment.app-create(
              v-if="canAddComment"
              @created="createCommentHandler"
              :articleId="article._id"
            )
          h3.comments-name(:class="{'head-center': !commentsExist}") Комментарии

          .comments(v-if="article.comments.length")
            app-comment(
              v-for="comment in article.comments"
              :key="comment._id"
              :comment="comment"
            ) 
          p.comments-none(v-else) Комментариев нет. 
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppLogoBackground from '@/components/main/LogoBackground'
import AppCreateComment from '@/components/main/CreateComment'
export default {
  head () {
    return {
      title: `${this.article.title} | ${process.env.appName}`
    }
  },
  components: {
    AppComment,
    AppLogoBackground,
    AppCreateComment
  },
  validate({params}) {
    return Boolean(params.id)
  },
  async asyncData({store, params}) {
    let article = await store.dispatch('articles/fetchById', params.id)
    article = {...article, views: ++article.views}
    await store.dispatch('articles/addView', article)
    return {article}
  },
  data() {
    return {
      commentsExist: true,
      canAddComment: true
    }
  },
  methods: {
    createCommentHandler(comment) {
      this.article.comments.unshift(comment)
      this.canAddComment = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.famous-wrap
  overflow hidden
  position relative
.article
  margin 0 auto
  display flex
  flex-direction column
  align-items center
  max-width 1200px
  padding 0 10px
  @media (max-width 756px)
    padding 0 5px
  &-image
    img
      width 100%
      max-width 1200px
      height auto
      border-radius 4px
  &-title
    display flex
    justify-content space-between
    align-items center
    background #252525
    color #fffdec
    padding 0 20px
    border-radius 4px
    i
      color #fffdec
  &-header
    margin-bottom 1.5rem
  &-info
    display flex
    justify-content space-between
    margin 1rem 0
  &-content
    margin-bottom 2rem
  &-footer
    position relative
    background #252525
    width 100vw
    display flex
    justify-content center
    align-items center
    flex-direction column
    padding 50px 10px 30px
  .comments
    &-wrap
      width 100%
      max-width 900px
      position relative
    &-name
      color #fffdec
      text-align left
      width 100%
      margin-top 60px
      &.head-center
        text-align center
    &-none
      color #fffdec
      text-align center

.app-create
  max-height 328px
  width 100%
  overflow hidden
.hide-form
  &-leave-active
    transition opacity .5s ease, max-height .5s ease

  &-leave-to
    opacity 0
    max-height 0
</style>
