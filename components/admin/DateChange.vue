<template lang="pug">
  .data-change
    span Дата последних изменений:
    span  {{new Date(dateLast).toLocaleString()}}
</template>

<script>
export default {
  props: {
    'date-last': String
  }
}
</script>

<style lang="stylus" scoped>
.data-change
  margin 0 0 40px
  font-size 12px
  color #777
</style>
