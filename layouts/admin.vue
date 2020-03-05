<template lang="pug">
  .admin-layout
    el-container
      el-aside(width="250px")
        app-aside
      el-main
        nuxt
</template>

<script>
import AppAside from '@/components/admin/Aside'
export default {
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
    &-aside
      //
</style>
