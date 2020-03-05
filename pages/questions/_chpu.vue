<template lang="pug">
  article.question
    header.question-header
      .question-breadcrumb
        nuxt-link.link-item(to="/questions") Вопросы 
        span / Раздел вопроса / Задаваемый вопрос

    main.question-content
      p Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquam, ipsum quo ut eaque voluptatibus tempore id perferendis sed, impedit obcaecati, magni molestias architecto! Molestias consectetur cum cupiditate fuga! Quidem?
      div {{dataQuestions}}
</template>

<script>
import dataQuestions from '@/json/dataQuestions.json'
export default {
  data() {
    return {
      dataQuestions
    }
  },
}
</script>

<style lang="stylus" scoped>
.question
  padding 0 40px 40px 40px
  min-height 100%
  .link-item
    color #429ce3
    text-decoration none
  &-breadcrumb
    padding 20px 0 5vh 0
    font-size 12px
    span
      color #373737
  &-content
    display flex
    justify-content center
    align-items stretch
    width 100%
    flex-direction column
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
</style>
