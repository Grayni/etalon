<template lang="pug">
  .famous-wrap
    article.article
      header.article-header
        .article-title
          h1 Article title
          nuxt-link(to="/articles")
            i.el-icon-back
        .article-info
          small
            i.el-icon-time
            |  {{ new Date().toLocaleString() }}
          small
            i.el-icon-view
            |  42
        .article-image
          img(src="/articles/office.jpg" alt="НДС")
      main.article-content
        p Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore illum facilis eos vel perspiciatis repellat, in cupiditate eveniet magnam, beatae, sed ullam reiciendis facere. Nemo nisi a saepe libero impedit?
        p Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore illum facilis eos vel perspiciatis repellat, in cupiditate eveniet magnam, beatae, sed ullam reiciendis facere. Nemo nisi a saepe libero impedit?
        p Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore illum facilis eos vel perspiciatis repellat, in cupiditate eveniet magnam, beatae, sed ullam reiciendis facere. Nemo nisi a saepe libero impedit?
        p Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore illum facilis eos vel perspiciatis repellat, in cupiditate eveniet magnam, beatae, sed ullam reiciendis facere. Nemo nisi a saepe libero impedit?
      footer.article-footer
        app-logo-background
        .comments-wrap
          transition(name="hide-form")
            app-create-comment.app-create(v-if="canAddComment" @created="createCommentHandler")
          h3.comments-name(:class="{'head-center': !commentsExist}") Комментарии

          .comments(v-if="commentsExist")
            app-comment(
              v-for="comment in 4"
              :key="uid+comment"
              :comment="commentMeaning"
            ) 
          p.comments-none(v-else) Комментариев нет. 
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppLogoBackground from '@/components/main/LogoBackground'
import AppCreateComment from '@/components/main/CreateComment'
export default {
  components: {
    AppComment,
    AppLogoBackground,
    AppCreateComment
  },
  validate({params}) {
    return Boolean(params.id)
  },
  data() {
    return {
      commentsExist: true,
      commentMeaning: '',
      canAddComment: true
    }
  },
  methods: {
    createCommentHandler() {
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
