<template lang="pug">
  // el-aside.questions-aside(width="400px")
  //   .questions-container-menu
  //     h3 Чаты
  // el-row(type="flex", justify="center")
  // el-col(:xs="23", :sm="14", :md="20", :lg="18")
  el-container.chart-box
    el-main.chart-box-in
      slot
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.chart-box
  background #333
</style>
