<template lang="pug">
  .phrase
    .wrap
      app-angle.left
      .phrase-container
        slot
      app-angle.right
</template>

<script>
import AppAngle from '@/components/elements/angle'
export default {
  components: {
    AppAngle
  }
}
</script>

<style lang="stylus" scoped>
  .phrase
    font 24px h
    display flex
    justify-content center
    padding 12vh 20vw
    color #b8b8b8
    background #252525
    @media (max-width 1439px)
      padding 12vh 20vw
    @media (max-width 1023px)
      padding 12vh 10vw
    @media (max-width 674px)
      padding 50px
    @media (max-width 664px)
      padding 30px 10px
      font-size 18px
    .wrap
      position relative
      width 90vw
    &-container
      padding 50px 50px 40px 50px
      @media (max-width 1023px)
        padding 30px 10px
    b
      font-size 15px
      line-height 10px
    p
      display block
      text-align center
      line-height 30px
      position relative
      z-index 1
</style>
