<template lang="pug">
  .logo
    nuxt-link(to="/")
      img.img(:src="src" alt="Логотип компании ЦБО Эталон" :width="size[0]" :height="size[1]" :style="{width: `${size[0]}px`, height: `${size[1]}px`}")
</template>
<script>
export default {
  props: {
    size: Array
  },
  data() {
    return {
      src: '/logo.svg'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .logo
    padding 10px 10px 10px 20px
    border-radius 50%
</style>