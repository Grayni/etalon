<template lang="pug">
  .border.checkboxes
    h3 {{information.title}}
    el-form(
      :model="checkboxWatch"
      :rules="rules"
    )
      el-form-item(prop="checkedItems")
        el-checkbox-group(v-model="checkboxWatch.checkedItems")
          el-checkbox(
            v-for="(act, id) of information.items"
            :key="id+uid"
            :label="act"
            border
            name="checkedItems"
          )
</template>

<script>
export default {
  props: {
    information: Object
  },
  data() {
    return {
      checkboxWatch: {
        checkedItems: []
      },
      rules: {
        checkedItems: {
          type: 'array',
          required: true,
          message: 'Выберите хотя бы один вид деятельности',
          trigger: 'change'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .checkboxes
    height 100%
    display flex
    justify-content center
    align-items center
    flex-direction column
    h3
      margin-bottom 5vh
    .el
      &-checkbox
        color #fffdec
        &.is-bordered+.el-checkbox.is-bordered
          margin 10px 0 0 0
        &:hover
          border-color #429ce3
          color #429ce3
        &-group
          display flex
          justify-content center
          align-items flex-start
          flex-direction column
</style>
