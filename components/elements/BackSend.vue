<template lang="pug">
  .back-send
    .back-send-box
      .cross-line
        .cross
      .content-line
        .content
</template>

<script>
</script>

<style lang="stylus" scoped>
.back-send
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background #373737
  z-index 20000
  display flex
  justify-content center
  align-items center
  flex-direction column
  display none
  .back-send-box
    width 70vw
    height 80vh
    min-height 200px
    max-height 300px
    min-width 320px
    max-width 600px
    border-radius 4px
  .cross
    height 20px
    width 20px
    &-line
      background yellow
      
</style>
