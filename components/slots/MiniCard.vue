<template lang="pug">
  .minicard
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
.box
  display flex
  justify-content baseline
  align-items center
  flex-direction column
svg
  width auto
  height 100px
  path
    fill #fffdec
    fill-rule evenodd
.header
  font-size 12px
  text-transform uppercase
  max-width 150px
  display inline-block
  text-align center
  padding-top 10px
.minicard
  display flex
  flex-direction row
  justify-content center
  align-items center
  width 200px
  height 180px
</style>
