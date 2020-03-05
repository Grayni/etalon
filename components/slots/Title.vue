<template lang="pug">
  .title
    .glass
    h2.title-text
      slot
</template>
<style lang="stylus" scoped>
.title
  padding 2px
  border 4px solid #429CE3
  margin 10vh 0
  transform rotate(-2deg)
  background rgba(66,156,227,.06)
  position relative
  display inline-block
  @media (max-width 1199px)
    margin 35px 0
  &-text
    margin 0
    color #429CE3
    padding 5px
    border 1px solid #429CE3
    font-weight bold
    box-shadow 0 0 13px rgba(255,253,236, 1), 0 10px 13px rgba(255,253,236, .5), 15px 5px 31px rgba(255,253,236, 1)
    @media (max-width 1199px)
      font-size 24px
  .glass
    position absolute
    width 100%
    height 100%
    left 0
    top 0
    pointer-events none
    box-shadow inset -10px 10px 20px rgba(255,253,236, .5), inset 10px -10px 10px rgba(255,253,236, .5)
</style>
