<template lang="pug">
  .offer
    .box
      svg(
        xmlns="http://www.w3.org/2000/svg"
        :width="svgParams.width"
        :height="svgParams.height"
        :viewBox="`0 0 ${svgParams.width} ${svgParams.height}`"
      )
        path.mountains(:d="pathD")
      slot
</template>

<script>
export default {
  props: ['svgParams', 'pathD', 'header']
}
</script>

<style lang="stylus" scoped>
.offer
  @media (max-width 1330px)
    margin 0 20px
.box
  width 240px
  height 420px
  background rgba(255,255,255,0.7)
  box-shadow 0 3px 7px rgba(0,0,0,0.3)
  display flex
  justify-content space-between
  align-items center
  flex-direction column
  border-radius 4px
  @media (max-width 900px)
    flex-direction row
    height 200px
    width 500px
    margin-bottom 20px
  @media (max-width 510px)
    flex-direction column
    width 300px
    height 420px
  svg
    width 100%
    height 192px
    padding 30px
    border-bottom 1px solid #fffdec
    @media (max-width 900px)
      border-bottom none
    @media (max-width 510px)
      border-bottom 1px solid #fffdec
    path
      fill #252525
      fill-rule evenodd
  p
    padding 20px 18px 40px 18px
    height 100%
    max-height 228px
    font 14px h
    line-height 24px
    background rgba(55,55,55,0.7)
    @media (max-width 900px)
      padding 20px 18px 0 18px
      display block
      width 200%
      border-radius 0
    @media (max-width 510px)
      padding 20px 18px 40px 18px
      display inline
      width auto

  span
    display block
    &.header
      color #429ce3
      font-weight bold
      display inline-block
      height 48px
    &.annotation
      color #b8b8b8
      height 100%
      display flex
      justify-content flex-start
      align-items flex-start
      padding-top 5px
      @media (max-width 900px)
        height auto
      @media (max-width 510px)
        height 100%
</style>
