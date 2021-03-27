<template lang="pug">
  .admin-layout
    el-container
      el-aside(width="260px" style="position: relative")
        app-aside
        a.admin-layout-link(href="https://cbo-etalon.ru" target="_blank") cbo-etalon.ru
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
  },
  data() {
    return {
      urlSite: process.env.prodEnv
    }
  }
}
</script>

<style lang="stylus" scoped>
.admin-layout
  width 100%
  min-height 100vh
  height 100vh
  position relative
  .el
    &-container
      height 100%
    &-main
      background-color #fffdec
      padding 40px
      .wrapper-main
        padding-bottom 120px
  &-link
    color #999
    position absolute
    bottom 0
    display block
    left 60px
    text-align center
    margin-bottom 15px
    font-size 14px
</style>

