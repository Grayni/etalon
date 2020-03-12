<template lang="pug">
  .empty-layout
    nuxt
</template>

<script>
import {setError} from '@/plugins/mixins'
export default {
  mixins: [setError]
}
</script>

<style lang="stylus" scoped>
  .empty-layout
    display flex
    justify-content center
    align-items center
    width 100%
    background #fffdec
    min-height 100vh
</style>
