<template lang="pug">
  .admin-rates
    app-breadcrumb(:way="data")

    el-form(
      :model="controls",
      :rules="rules",
      ref="rates-create",
      @submit.native.prevent="onSubmit('rates-create')"
    )
      h2 Название
      el-form-item.name-service(label="Название услуги", prop="title")
        el-input.input-service(v-model="controls.title")

      .mb

      el-form-item.switches(prop="switches")
        h2 Статус тарифов
        .wrap-switch-group
          .wrap-switch
            h3.name Minimum
            el-switch(
              v-model="controls.switches[0]"
              active-text="+"
              inactive-text="-"
            )
          .wrap-switch
            h3.name Lite
            el-switch(
              v-model="controls.switches[1]"
              active-text="+"
              inactive-text="-"
            )
          .wrap-switch
            h3.name Optimal
            el-switch(
              v-model="controls.switches[2]"
              active-text="+"
              inactive-text="-"
            )
          .wrap-switch
            h3.name Maximum
            el-switch(
              v-model="controls.switches[3]"
              active-text="+"
              inactive-text="-"
            )

      .mb

      el-form-item.price(label="Задать цену", prop="price")
        el-input(v-model="controls.price")

      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )

          span.text-button Создать услугу

</template>

<script>
import AppBreadcrumb from '@/components/admin/Breadcrumb'
import {validateForm} from '@/plugins/mixins'
export default {
  layout: 'admin',
  middleware: 'admin-auth',
  head: {
      title: 'Создать услугу'
  },
  mixins: [validateForm],
  components: {
    AppBreadcrumb
  },
  data() {
    return {
      loading: false,
      constControl: {},
      data: {
        path: '/admin/price-rates',
        name: 'Цены на тарифы',
        title: 'Создать услугу'
      },
      controls: {
        title: '',
        price: '',
        switches: [false, false, false, false]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            activators: this.switches,
            price: this.controls.price
          }

          try {
            await this.$store.dispatch('rates/create', formData)
            this.$message.success('Данная услуга успешно добавлена!')
          } catch(e) {} finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.admin-rates
  max-width 1400px
  .price
    max-width 600px
  .name-service
    display flex
    justify-content center
    align-items center
    flex-direction column

  .input-service
    min-width 600px
  .button-wrap
    margin-top 50px
  .old-wersion
    &-wrap
      margin 60px 0 40px 0
      padding-bottom 20px
      border-radius 4px
      border-bottom 1px solid #ddd

  .switches
    padding 10px 20px
    display flex
    justify-content center
    align-items center
    flex-direction column
    border-top 1px solid #ddd
    border-bottom 1px solid #ddd
    margin 50px 0
  h2
    font-size 22px
  .wrap-switch
    padding 10px 50px
    &-group
      display flex
  .sign
    font 30px Arial
</style>
