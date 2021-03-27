<template lang="pug">
  el-row.about
    el-col(:span="24")
      app-phrase.phrases
        p Наша небольшая компания всегда ищет новые возможности для реализации стабильного сотрудничества.
        p 
          | Плюсом нашей фирмы является 
          b невысокая стоимость бухгалтерских услуг
          | .
        p Если нужно срочно сдать отчет - обращайтесь. Если вы только начинаете ведение дела и не знаете с чего начать - закажите обратный звонок для бесплатной консультации.
        p Мы применяем индивидуальный подход к каждому клиенту и оказываем услуги только высокого качества.
        p 
          | На сайте компании вы найдете всю необходимую информацию о нас. Вы можете 
          b сделать правильный выбор
          | .
</template>
<script>
import AppPhrase from '@/components/slots/Phrase'
export default {
  components: {
    AppPhrase
  }
}
</script>
<style lang="stylus" scoped>
.about
  .phrases
    p
      padding 10px 50px
      &:nth-child(1)
        padding 50px 50px 10px 50px
      &:nth-child(5)
        padding 10px 50px 50px 50px
      @media (max-width 664px)
        padding-left 10px
        padding-right 10px
        font-size 14px
        line-height 18px
      b
        font 24px h
        color #429ce3
        @media (max-width 664px)
          font-size 14px
</style>