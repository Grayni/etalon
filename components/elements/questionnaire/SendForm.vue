<template lang="pug">
  .board.email
    h3 Данные для получения расчета
    el-form(
      ref="send-mail"
      :model="inputType"
      :rules="rules"
      @submit.native.prevent="onSubmit('send-mail')"
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
          label="Согласие на обработку персональных данных"
          name="agree"
        )
          | Согласие на обработку 
          a.link(href="/politic.pdf" target="_blank") персональных данных

      el-form-item.sendler
        el-button(
          type="success"
          native-type="submit"
          :loading="loading"
        ) Запрос расчета
</template>

<script>
import {validateForm} from '@/plugins/mixins'
export default {
  mixins: [validateForm],
  data() {
    return {
      loading: false,
      inputType: {
        name: '',
        phone: '',
        email: '',
        agree: ['Согласие на обработку персональных данных']
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true
          
          const formData = {
            userInfo: this.inputType,
            companyInfo: this.$store.state.sendings.sendler
          }
          try {
            if (formData.companyInfo.page_1) {
              await this.$store.dispatch('sendings/sendQuestionnaire', formData)

              let obj = {
                type: 'Анкета',
                page_1: [],
                page_2: 'Индивидуальный предприниматель (ИП)',
                page_3: [],
                page_4: 0,
                page_5: 0,
                page_6: 0
              }

              this.$emit('clicker')
              this.$store.commit('sendings/dataMail', null)
              this.$store.commit('sendings/dataQuestionnaire', obj)

            } else {
              await this.$store.dispatch('sendings/send', formData)
              this.$store.commit('showChange')
            }
            this.$message.success('Запрос отправлен. Анализ данных.')
          } catch(e) {} finally { this.loading = false }
        }
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
  padding-top 20px
.link
  color #429ce3
  &:hover
    color #92bfe3
</style>
