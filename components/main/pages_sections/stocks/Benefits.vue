<template lang="pug">
  el-row.famous-wrap
    el-col
      h2 Акции на бухгалтерское обслуживание
      .famous-wrap-container
        .benefit(v-for="(benefit,id) in benefits" :key="id+_uid")
          .round
            .round-in
              span.num {{ benefit }}
</template>
<script>
let kute, kuteCSS

if (process.client) {
  kute = require('kute.js')
  kuteCSS = require('kute.js/kute-css')

}
export default {
  data() {
    return {
      benefits: [
        'Месяц бухгалтерского обслуживания бесплатно при заключении договора на 1 год',
        'Предварительный расчет налогов (до окончания квартала) беплатно',
        'Приведите друга и получите скидку 4000 рублей',
        'Ведение кадрового учета (до 3-х сотрудников) бесплатно',
        'Консультации бесплатно',
        'При подключении к нашему корпоративному тарифу по ТКС - подписание соглашения с ПФР бесплатно'
      ],
      scene1: null,
      tween1: null
    }
  },
  methods: {
    animate() {
      this.tween1 = kute.allFromTo('.benefit', {rotateY:0}, {rotateY:1440},{offset: 200, duration: 1200, ease: Power0.in})
      this.tween1.start()
    }
  },
  mounted() {
    this.animate()
  },
  updated() {
    this.animate()
  }
}
</script>
<style lang="stylus" scoped>
.famous-wrap
  padding-bottom 100px
  background #575757
  min-height 100vh
  &-container
    display flex
    justify-content center
    align-items center
    max-width 900px
    flex-wrap wrap
    border-bottom 2px dashed #252525
    border-top 2px dashed #252525
    padding 40px 0 60px
  .el-col
    display flex
    justify-content center
    align-items center
    flex-direction column
.benefit
  padding 20px 50px
  display flex
  justify-content baseline
  align-items center
  flex-direction column
.round
  width 200px
  height 200px
  &-in
    width 100%
    height 100%
    background #252525
    border-radius 50%
    box-shadow inset 0 0 10px rgba(0,0,0,.4)
    display flex
    align-items center
    justify-content center
    padding 10px

.num
  color #429ce3
  text-align center
  font 14px/20px h
h2
  color #b8b8b8
</style>