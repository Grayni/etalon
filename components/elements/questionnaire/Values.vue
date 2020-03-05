<template lang="pug">
  .board.values
    h3 {{information.title}}
    p(v-if="information.subtitle") {{information.subtitle}}
    el-input-number(
      v-model="num"
      @change="handleChange"
      :min="0"
      :max="300"
    )
</template>

<script>
export default {
  props: {
    information: Object
  },
  data() {
    return {
      num: 0
    }
  },
  methods: {
    handleChange(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="stylus">
.values
  height 100%
  display flex
  justify-content center
  align-items center
  flex-direction column
  p
    margin-bottom 3vh
  .el-input-number
    span
      border-color #373737
    .el-input__inner
      border-color #373737
      border-radius 5px
      background #373737
      color #fffdec
      box-shadow 2px 2px 8px rgba(0,0,0,.2)
</style>
