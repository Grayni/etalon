<template lang="pug">
  img.logo-background(src="/logo.svg" alt="Фон для темного блока")
</template>

<script>
</script>

<style lang="stylus" scoped>
.logo-background
  position absolute
  top 0
  bottom 0
  height 90%
  min-height 500px
  margin auto 0
  left 10%
  transform skew(-20deg)
  opacity .05
  filter grayscale(100%)
</style>
