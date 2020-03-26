<template lang="pug">
  .board.form
    h3 Ваша форма собственности:
    el-switch(
      v-model="property"
      :active-text="forms[0]"
      :inactive-text="forms[1]"
      @change="saveOrganizationIp(property)"
    )
</template>

<script>
export default {
  data() {
    return {
      property: false,
      forms: [
        'Организация (ООО)',
        'Индивидуальный предприниматель (ИП)'
      ]
    }
  },
  methods: {
    saveOrganizationIp(val) {
      let obj = {
        page_2: ''
      }

      obj.page_2 = (val) ? this.forms[0] : this.forms[1]

      this.$store.commit('sendings/dataQuestionnaire', obj)
    }
  }
}
</script>

<style lang="stylus">
.form
  height 100%
  display flex
  justify-content center
  align-items center
  flex-direction column
  .el-switch
    .el-switch__label
      color #b8b8b8
      &.is-active
        color #dcbc96
    .el-switch__core
      background #373737
</style>
