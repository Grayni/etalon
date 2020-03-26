<template lang="pug">
  el-row.physics
    el-col.physics-wrap(:span="24")
      h3 Для физических лиц
      h2.ndfl Декларация 3-НДФЛ
      h2.sum 1000 рублей
      span.deduction 1 вычет
      span.following За каждый последующий  +200 рублей
      // Небольшой блок про это
</template>

<style lang="stylus" scoped>
.physics
  &-wrap
    min-height 60vh
    display flex
    justify-content center
    align-items center
    flex-direction column
    background #252525
    color #373737
    color #b8b8b8
    h2
      &.ndfl
        margin 20px 0 10px
        color #fffdec
      &.sum
        margin 0 0 6px
        color #429ce3
    .deduction
      margin-bottom 20px
      font-size 14px
      
</style>