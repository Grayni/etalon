<template lang="pug">
  el-row.about
    el-col(:span="24")
      app-phrase
        p
          | ЦБО <b>«</b>Эталон<b>»</b> — это аутсорсинговая организация по предоставлению бухгалтерских услуг. Мы ценим доверие наших клиентов и к каждому ищем 
          span.key-people-heart индивидуальный подход
          |.
      // h2 О компании
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
</style>
