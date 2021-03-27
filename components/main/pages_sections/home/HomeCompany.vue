<template lang="pug">
  el-row.about
    el-col(:span="24")
      app-phrase
        p
          | ЦБО <b>«</b>Эталон<b>»</b> — это аутсорсинговая организация по предоставлению бухгалтерских услуг. Мы ценим доверие наших клиентов и к каждому ищем 
          span.key-people-heart индивидуальный подход
          |.
        br
        .pr
          span ЦБО <b>«</b>Эталон<b>»</b> — это 
          h2 оказание бухгалтерских услуг в Санкт-Петербурге
          span ,
          p а также сотрудничество с компаниями в других регионах России.

</template>
<script>
import AppPhrase from '@/components/slots/Phrase'
export default {
  components: {
    AppPhrase
  }
}
</script>

<style lang="stylus">
  .about
    border-bottom 1px solid #373737
    box-shadow 5vh 0 20px rgba(0,0,0,0.2)
    .key-people-heart
      color #429CE3
    h2
      display inline
      line-height 30px
      position relative
      font normal 24px h
      margin 0
      text-transform none
    p, .pr
      display inline-block
      font-size 24px
      text-align center
    .pr
      white-space pre-line
    @media (max-width 664px)
      h2, p, span
        font normal 18px h
        line-height 30px
</style>
