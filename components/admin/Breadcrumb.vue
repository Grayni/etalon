<template lang="pug">
  el-breadcrumb.breadcrumb(separator="/")
    el-breadcrumb-item(:to="{ path: way.path }") {{way.name}}
    el-breadcrumb-item {{ way.title }}
</template>

<script>
export default {
  props: {
    way: Object
  }
}
</script>

<style lang="stylus" scoped>
  .breadcrumb
    margin-bottom 25px
    font-size 12px
</style>
