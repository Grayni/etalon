<template lang="pug">
  .contact-form
    form
      el-input(
        placeholder="Ваше имя"
        v-model="inputName"
        clearable
      )
      el-input(
        placeholder="Номер телефона"
        v-model="inputNumber"
        clearable
      )
      el-input(
        placeholder="Ваш вопрос"
        type="textarea"
        v-model="inputQuestion"
      )
      el-button(type="info")
        i.el-icon-message
        | Отправить
</template>

<script>
export default {
  data() {
    return {
      inputName: '',
      inputNumber: '',
      inputQuestion: ''
    }
  }
}
</script>

<style lang="stylus">
  .contact-form
    padding 57px 60px 37px 20px
    border 1px solid rgb(184,184,184)
    border-radius 5px
    display flex
    margin-left 2vw
    .el-input, .el-textarea
      margin-bottom 20px
      input, textarea
        background-color #252525
        color rgb(184,184,184)
        border-color rgb(184,184,184)
        font 18px h
  .el-button
    font 16px h
    text-transform uppercase
  .el-icon-message
    &:before
      margin-right 5px
</style>
