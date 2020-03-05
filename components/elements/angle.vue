<template lang="pug">
  .angle(v-if="width>664")
</template>
 
<script>
import {widthWatch} from '~/plugins/mixins'
export default {
  mixins: [widthWatch]
}
</script>

<style lang="stylus">
  .angle
    width 25%
    height 25%
    position absolute
    &.left
      top -2px
      left -2px
      border-radius 100% 0 0 0
      border-left 1px solid rgb(220, 188, 150)
      border-top 1px solid rgb(220, 188, 150)
    &.right
      bottom -2px
      right -2px
      border-radius 0 0 100% 0
      border-right 1px solid rgb(220, 188, 150)
      border-bottom 1px solid rgb(220, 188, 150)
</style>
