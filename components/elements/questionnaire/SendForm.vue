<template lang="pug">
  .board.email
    h3 Данные для получения расчета
    el-form(
      ref="form"
      :model="inputType"
      :rules="rules"
    )

      el-form-item(prop="name")
        el-input(v-model="inputType.name" placeholder="Как вас зовут?")

      el-form-item(prop="phone")
        el-input(
          v-model="inputType.phone"
          placeholder="(000)-000-00-00"
          v-mask="'(###) ###-##-##'"
        )
          template(slot="prepend") +7

      el-form-item(
        prop="email"
        :rules="rules.email"
      )
        el-input(v-model="inputType.email" placeholder="Ваш Email")

      el-form-item(prop="agree")
        el-checkbox(
          v-model="inputType.agree"
          name="agree"
          label="Согласие на обработку персональных данных"
        )

      el-form-item.sendler
        el-button(type="success" @click="submitForm('form')") Запрос расчета
</template>

<script>
import {validateForm} from '@/plugins/mixins'
export default {
  mixins: [validateForm],
  data() {
    return {
      inputType: {
        name: '',
        phone: '',
        email: '',
        agree: ['Согласие на обработку персональных данных']
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        else console.log('Good!')
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
.email
  height 100%
  display flex
  justify-content center
  align-items center
  flex-direction column
.el-button
  margin-left 0
.sendler
  display flex
  text-align center
  justify-content center
</style>
