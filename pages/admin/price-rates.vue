<template lang="pug">
  .price-rates
    h3 Таблица тарифов
    app-date-change(:date-last="new Date().toLocaleString()")

    el-table(
      :data="rates"
    )
      el-table-column(
        type="index"
        label="№"
        width="50"
      )
      el-table-column(
        prop="title",
        label="Название"
        min-width="200"
        width="auto"
      )
      el-table-column(
        label="Minimum"
        width="100px"
        align="center"
      )
        template(slot-scope="{row: {activators}}")
          span.sign {{activators[0] | sign}}

      el-table-column(
        label="Lite"
        width="100px"
        align="center"
      )
        template(slot-scope="{row: {activators}}")
          span.sign {{activators[1] | sign}}
      el-table-column(
        label="Optimal"
        width="100px"
        align="center"
      )
        template(slot-scope="{row: {activators}}")
          span.sign {{activators[2] | sign}}
      el-table-column(
        label="Maximum"
        width="100px"
        align="center"
      )
        template(slot-scope="{row: {activators}}")
          span.sign {{activators[3] | sign}}

      el-table-column(
        prop="price",
        label="Стоимость"
        width="150px"
      )

      el-table-column(
        label="Действия"
        width="152"
      )
        template(slot-scope="{row}")
          el-tooltip.item(
            effect="dark"
            content="Редактировать улугу"
            placement="top"
          )
            el-button(
              icon="el-icon-edit"
              type="info"
              circle
              @click="open(row._id)"
            )
          el-tooltip(
            effect="dark"
            content="Удалить услугу"
            placement="top"
          )
            el-button(
              icon="el-icon-delete"
              type="danger"
              circle
              @click="remove(row._id)"
            )
    app-add(:urls="'/admin/price-rate-create'" :title="'Добавить услугу'")
</template>

<script>
import AppDateChange from '@/components/admin/DateChange'
import AppAdd from '@/components/admin/Add'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head() {
    return {
      title: `Цены на тарифы | ${process.env.appName}`,
      meta: [
        {
          hid: `noindex-${this.$route.name}`,
          name: 'robots',
          content: 'noindex'
        }
      ]
    }
  },
  components: {
    AppDateChange,
    AppAdd
  },
  async asyncData({store}) {
    const rates = await store.dispatch('rates/fetchAdmin')
    return {rates}
  },
  methods: {
    open(id) {
      this.$router.push(`/admin/rates/${id}`)
    },
    async remove(id) {
      try {
        await this.$confirm('Удалить услугу?', 'Внимание!', {
          confirmButtonText: 'Да, определенно',
          cancelButtonText: 'Нет',
          type: 'warning'
        })

        await this.$store.dispatch('rates/remove', id)
        this.rates = this.rates.filter(x => x._id !== id)

        this.$message.success('Услуга успешно удалена!')
      } catch(e) {}
    }
  }
}
</script>

<style lang="stylus" scoped>
.price-rates
  width 100%
  display flex
  justify-content center
  flex-direction column
  align-items center
  .el-table
    max-width 1200px
  .sign
    font 20px Tahoma
</style>
