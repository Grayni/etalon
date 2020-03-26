<template lang="pug">
  article.question
    header.question-header
      .question-breadcrumb
        nuxt-link.link-item(to="/questions") Вопросы
        span / {{showSectionsLabel(page.section)}} / {{ page.question }}

          .question-head {{ page.question }}

    main.question-content
      vue-markdown {{ page.answer }}

      small.view
        i.el-icon-view
        span  {{ page.views }}

</template>

<script>
import {showSectionsLabel} from '@/plugins/mixins'
export default {
  layout: 'default',
  mixins: [showSectionsLabel],
  head() {
    return {
      title: `${this.page.question} | ${process.env.appName}`,
      meta: [{
        hid: `questions-${this.page.chpu}-description`, name: 'description', content: `Ответ на вопрос: ${this.page.question}`
      }]
    }
  },
  async asyncData({store, params}) {
    let page = await store.dispatch('questions/fetchByChpu', params.chpu)
    page.views += 1
    await store.dispatch('questions/addViewQuestion', {views: page.views, id: page._id})
    return { page }
  }
}
</script>

<style lang="stylus" scoped>
.question
  padding 0 40px 40px 40px
  min-height 100%
  &-head
    margin 40px 0 0 0
    font bold 16px h
  .link-item
    color #429ce3
    text-decoration none
  &-breadcrumb
    padding 10px 0 2vh 0
    font-size 12px
    border-bottom 1px solid #373737
    span
      color #777
      text-transform lowercase
  &-content
    display flex
    justify-content center
    align-items stretch
    width 100%
    flex-direction column
    font-size 14px
    padding-top 8vh
    line-height 20px
    &-wrap
      margin-top 2vh
      border-radius 4px
      padding 30px 10px 10px 10px
      max-width 1200px
      flex 1 1 auto
      p
        line-height 24px
        font 16px h
        color #373737
      ul
        padding 20px
        border-left solid 1px #e6e6e6
      li
        text-transform uppercase
        margin-bottom 14px
        list-style-type none
        .link-item
          color #429ce3
          text-decoration none
          &:hover
            color #dcbc96
  .view
    margin-top 30px
</style>

