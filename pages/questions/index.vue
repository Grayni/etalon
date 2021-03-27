<template lang="pug">
  article.question
    main.question-content
      .question-content-wrap
        p Данный раздел посвящен ответам на часто задаваемые вопросы.
        p Все разбито на разделы для ускоренного поиска.
        p Ниже выбраны самые частые вопросы из всего списка:
        ul
          li(v-for="(quest, id) in oftenQuestions" :key="id+_uid")
            nuxt-link.link-item(:to="`/questions/${translit(quest)}`") {{quest}}

</template>

<script>
import {transliter} from '@/plugins/mixins'
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
  mixins: [
    transliter
  ],
  data() {
    return {
      oftenQuestions: [
        'Как обеспечивается конфиденциальность? Какие гарантии у клиента?',
        'Как происходит обмен документами? Что, если справка требуется срочно?',
        'Как рассчитывается стоимость обслуживания в центре? От чего зависят цены?',
        'Как часто меняются тарифы? Что если счет окажется выше, чем мы запланировали?',
        'Кто несет ответственность за ошибки в отчетах и несвоевременность сдачи деклараций?'
      ],
      meta: {
        title: 'Вопросы по оказанию бухгалтерских услуг',
        description: 'В данном разделе собраны часто задаваемые вопросы. Здесь Вы можете познакомиться с политикой нашей компании и более подробно изучить наш подход к вендению бухгалтерского учета.'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.question
  padding 0 40px 40px 40px
  min-height 100%
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
