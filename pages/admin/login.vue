<template lang="pug">
  el-card.login(shadow="never")
    app-logo-background
    el-form(
      :model="controls",
      :rules="rules",
      ref="input-admin",
      @submit.native.prevent="onSubmit('input-admin')"
    )
      h3.header-admin Портал в запределье
      el-form-item(label="Ваше логин", prop="login")
        el-input(v-model="controls.login")
  
      el-form-item(label="Ваш пароль" prop="pass")
        el-input(v-model="controls.pass" type="password" show-password)
      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )
          span.text-button Поехали
</template>

<script>
import {validateForm} from '@/plugins/mixins'
import AppLogoBackground from '@/components/main/LogoBackground'
export default {
  mixins: [validateForm],
  components: {
    AppLogoBackground
  },
  layout: 'empty',
  head() {
    return {
      title: 'Портал в запределье',
      meta: [
        {
          hid: `noindex-${this.$route.name}`,
          name: 'robots',
          content: 'noindex'
        }
      ]
    }
  },
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
              await this.$store.dispatch('auth/login', formData)
              this.$router.push('/admin')
            } catch (e) {
              this.loading = false
            }
          }
        }
      )
    }
  },
  mounted() {
    const {message} = this.$route.query

    switch(message) {
      case 'login':
        this.$message({
          type: 'warning',
          showClose: true,
          message: 'Сначала стань избранным',
          center: true
        })
        break
      case 'logout':
        this.$message({
          type: 'success',
          showClose: true,
          message: 'Ты смог(ла) выбраться!',
          center: true
        })
        break
      case 'session':
        this.$message.info('Время прибывания иссякло. Подтверди свою избранность.')
        break
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  width 500px
  box-shadow 0 0 5px rgba(0,0,0,.8)
  background #252525
  color #fffdec
  border none
  position relative
  .header-admin
    margin 0
    font normal 16px h
    text-transform uppercase
    color #777
    text-align right
  .button-wrap
    display flex
    justify-content center
    align-items center
    padding 15px 0 0
    margin 20px 0 0 0
    .el-button
      background-color transparent
      border-color #fffdec
      &:hover
        border-color #dcbc96
        color #dcbc96
    .text-button
      text-transform uppercase
</style>
