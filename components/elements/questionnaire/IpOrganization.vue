<template lang="pug">
  .board.form
    h3 Ваша форма собственности:
    el-switch(
      v-model="property"
      :active-text="forms[0]"
      :inactive-text="forms[1]"
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
