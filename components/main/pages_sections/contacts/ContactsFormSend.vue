<template lang="pug">
  .contact-form
    el-form(
      :model="controls",
      :rules="rules",
      ref="send-question",
      @submit.native.prevent="onSubmit('send-question')"
    )
      el-form-item(prop="name")
        el-input(
          placeholder="Ваше имя"
          v-model="controls.name"
          clearable
        )
      el-form-item(prop="phone")
        el-input(
          v-model="controls.phone"
          placeholder="Номер телефона (слитно без +7 или 8)"
          v-mask="'+7 (###) ###-##-##'"
          clearable
        )
      el-form-item(prop="text")
        el-input(
          placeholder="Ваш вопрос"
          type="textarea"
          v-model="controls.text"
        )

      el-form-item(prop="agree")
        el-checkbox(
          v-model="controls.agree"
          label="Согласие на обработку персональных данных"
          name="agree"
        )
          | Согласие на обработку 
          a.link(href="/politic.pdf" target="_blank") персональных данных

      el-form-item.button-wrap
        el-button(
          type="info"
          native-type="submit"
          :loading="loading"
        )
          i.el-icon-message(v-if="!loading")
          | Отправить
</template>

<script>
import {validateForm} from '@/plugins/mixins'
export default {
  mixins: [validateForm],
  data() {
    return {
      loading: false,
      controls: {
        name: '',
        phone: '',
        text: '',
        agree: ['Согласие на обработку персональных данных']
      }
    }
  },
  methods: {
    onSubmit(nameForm) {
      this.$refs[nameForm].validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            type: 'Вопрос из формы с реквизитами',
            name: this.controls.name,
            phone: this.controls.phone,
            question: this.controls.text
          }

          try {
            await this.$store.dispatch('sendings/question', formData)

            this.controls.name = ''
            this.controls.phone = ''
            this.controls.text = ''

            this.$message.success('Вопрос успешно отправлен!')
          } catch(e) {} finally {
            this.loading = false
          }
        }
      })
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
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
    background-color #b8b8b8
    border-color #b8b8b8
  .link, .el-checkbox__input.is-checked+.el-checkbox__label, .el-checkbox
    color #b8b8b8
  .el-input, .el-textarea
    margin-top 10px
    input, textarea
      background-color #252525
      color rgb(184,184,184)
      border-color rgb(184,184,184)
      font 18px h

  .el-icon-message
    &:before
      margin-right 5px
</style>
