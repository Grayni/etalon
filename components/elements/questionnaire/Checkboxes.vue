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
            :key="id+_uid"
            :label="act"
            border
            name="checkedItems"
            @change="saveActivity(checkboxWatch.checkedItems)"
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
  },
  methods: {
    saveActivity(value) {
      if (this.information.title === "Выберите вид Вашей деятельности:") {
        let obj = { page_1: value }
        this.$store.commit('sendings/dataQuestionnaire', obj)
      } else if (this.information.title === "Ваша система налогообложения:"){
        let obj = { page_3: value }
        this.$store.commit('sendings/dataQuestionnaire', obj)
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
