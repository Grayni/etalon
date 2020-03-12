<template lang="pug">
  el-card.comment(shadow="never")
    .comment-header
      span {{comment.name}}
      span
        i.el-icon-time
        |  {{ comment.date | date }}
    .comment-text
      p {{comment.text}}
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.comment
  margin-bottom 1.5rem
  background #373737
  color #fffdec
  border none
  box-shadow 0 0 2px rgba(255,253,236,.4)
  &-header
    display flex
    justify-content space-between
    margin-bottom 1.5rem
    font-size .8rem
  &-text
    white-space pre-line
</style>

