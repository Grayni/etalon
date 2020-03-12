<template lang="pug">
  .admin-rates
    app-breadcrumb(:way="data")

    .old-wersion-wrap
      h2 Изначальные данные
      el-table(:data="[constControl]" row-class-name="row-table")
        el-table-column(
          prop="title",
          label="Название услуги"
          width="auto"
          min-width="400"
        )
        el-table-column(
          label="Minimum"
          width="85"
          align="center"
          header-align="center"
        )
          template(slot-scope="{row: {activators}}")
            span.sign(v-if="activators[0]") +
            span.sign(v-else) -
        el-table-column(
          label="Lite"
          width="85"
          align="center"
          header-align="center"
        )
          template(slot-scope="{row: {activators}}")
            span.sign(v-if="activators[1]") +
            span.sign(v-else) -
        el-table-column(
          label="Optimal"
          width="85"
          align="center"
          header-align="center"
        )
          template(slot-scope="{row: {activators}}")
            span.sign(v-if="activators[2]") +
            span.sign(v-else) -
        el-table-column(
          label="Maximum"
          width="85"
          align="center"
          header-align="center"
        )
          template(slot-scope="{row: {activators}}")
            span.sign(v-if="activators[3]") +
            span.sign(v-else) -

        el-table-column(
          prop="price",
          label="Цена"
          min-width="200"
          align="center"
          header-align="center"
        )

    el-form(
      :model="controls",
      :rules="rules",
      ref="input-rates",
      @submit.native.prevent="onSubmit('input-rates')"
    )
      h2 Название
      el-form-item.name-service(label="Изменение названия услуги", prop="title")
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

      el-form-item.price(label="Изменить цену", prop="price")
        el-input(v-model="controls.price")

      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )

          span.text-button Обновить

</template>

<script>
import AppBreadcrumb from '@/components/admin/Breadcrumb'
import {validateForm, validateId} from '@/plugins/mixins'
export default {
  layout: 'admin',
  middleware: 'admin-auth',
  head() {
    return {
      title: `Услуга | ${this.service.title} | ${process.env.appName}`
    }
  },
  mixins: [validateForm, validateId],
  components: {
    AppBreadcrumb
  },
  async asyncData({store, params}) {
    const service = await store.dispatch('rates/fetchAdminById', params.id)
    return {service}
  },
  data() {
    return {
      loading: false,
      constControl: {},
      data: {
        path: '/admin/price-rates',
        name: 'Цены на тарифы',
        title: ''
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
            price: this.controls.price,
            id: this.service._id
          }

          try {
            await this.$store.dispatch('rates/update', formData)
            this.$message.success('Данная услуга успешно изменена!')
          } catch(e) {} finally {
            this.loading = false
          }
        }
      })
    }
  },
  created() {
    this.data.title = this.service.title
    this.controls.title = this.service.title
    this.controls.switches = this.service.activators
    this.controls.price = this.service.price

    // not use Object.assign or {...this.constControl} -> clone get, set
    this.constControl = JSON.parse(JSON.stringify(this.service))
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
  .el-table
    pointer-events none
</style>
