<template lang="pug">
  el-row.famous-wrap
    el-col
      h2 Акции на бухгалтерское обслуживание
      .famous-wrap-container
        .benefit(v-for="(benefit,id) in benefits" :key="id+_uid")
          .img
            .img-in
              .img-box
          h3 {{benefit.title}}
</template>
<script>
export default {
  data() {
    return {
      benefits: [
        {
          title: 'Месяц бухгалтерского обслуживания бесплатно',
          image: ''
        }, {
          title: 'Приведите партнера и получите скидку 2000 рублей',
          image: ''
        }, {
          title: 'Один предварительный расчет налога (до окончания квартала) бесплатно',
          image: ''
        }, {
          title: 'Бесплатная регистрация фирмы',
          image: ''
        }, {
          title: 'Дарим на год ключ для сдачи электронной отчетности',
          image: ''
        }, {
          title: 'Делаем особые скидки для постоянных клиентов',
          image: ''
        }
      ]
    }
  },
}
</script>
<style lang="stylus" scoped>
.famous-wrap
  padding-bottom 100px
  background #575757
  &-container
    display flex
    justify-content center
    align-items center
    max-width 900px
    flex-wrap wrap
    border-bottom 2px dashed #F56C6C
    border-top 2px dashed #F56C6C
  .el-col
    display flex
    justify-content center
    align-items center
    flex-direction column
    color #fffdec
.benefit
  padding 20px 50px
  display flex
  justify-content baseline
  align-items center
  flex-direction column
.img
  width 200px
  height 200px
  &-box
    width 50px
    height 50px
    background #F56C6C
  &-in
    width 100%
    height 100%
    background #fffdec
    border-radius 50%
    box-shadow inset 0 0 10px rgba(0,0,0,.4)
    display flex
    align-items center
    justify-content center
h3
  font normal 14px h
  width 200px
  color #b8b8b8
</style>