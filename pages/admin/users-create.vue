<template lang="pug">
  el-form.create-users(
    :model="controls",
    :rules="rules",
    ref="create-user",
    @submit.native.prevent="onSubmit('create-user')"
  )
    h3.header-users Создание пользователя
    el-form-item(label="Логин пользователя", prop="login")
      el-input(v-model="controls.login")

    el-form-item(label="Пароль пользователя" prop="pass")
      el-input(v-model="controls.pass" type="password" show-password)
    el-form-item.button-wrap
      el-button(
        type="primary"
        native-type="submit"
        :loading="loading"
      )
        span.text-button Создать
</template>

<script>
import {validateForm} from '@/plugins/mixins'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Создать пользователя | ${process.env.appName}`
  },
  mixins: [validateForm],
  data() {
    return {
      loading: false,
      controls: {
        login: '',
        pass: ''
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
          if (valid) {
            this.loading = true
            try {
              const formData = {
                login: this.controls.login,
                pass: this.controls.pass
              }
              await this.$store.dispatch('auth/createUser', formData)
              this.$message({
                type: 'info',
                showClose: true,
                message: 'Пользователь создан.',
                center: true
              })
              this.controls.login = ''
              this.controls.pass = ''
            } catch (e) {} finally {
              this.loading = false
            }
          }
        }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.create-users
  max-width 600px
.header-users
  text-align left
.button-wrap
  margin-top 20px
</style>
