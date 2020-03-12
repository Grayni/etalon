<template lang="pug">
  .wrap-time
    el-tooltip(
      placement="top"
      :content="date | date"
      effect="dark"
    )
      i.el-icon-time
    span  {{ date | date('date') }}
</template>

<script>
export default {
  props: {
    date: String
  }
}
</script>

<style lang="stylus" scoped>
</style>
