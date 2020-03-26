<template lang="pug">
  .admin-layout
    el-container
      el-aside(width="260px")
        app-aside
      el-main.main-content
        .wrapper-main
          nuxt
</template>

<script>
import AppAside from '@/components/admin/Aside'
import {setError} from '@/plugins/mixins'
export default {
  mixins: [setError],
  components: {
    AppAside
  }
}
</script>

<style lang="stylus" scoped>
.admin-layout
  width 100%
  min-height 100vh
  height 100vh
  .el
    &-container
      height 100%
    &-main
      background-color #fffdec
      padding 40px
      .wrapper-main
        padding-bottom 120px
</style>
