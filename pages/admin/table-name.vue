<template lang="pug">
  .create-table
    h3 Задать название для новой таблицы
    .create-table-form
      el-form.title-block-wrap(
        :model="controls",
        :rules="rules",
        ref="create-table-name",
        @submit.native.prevent="onCreate('create-table-name')"
      )
        el-form-item(label="Название таблицы" prop="title")
          el-input(v-model="controls.title")

        el-form-item.wrap-button
          el-button.create-button(
            type="success"
            native-type="submit"
            :loading="loading"
          )
            span.text-button Создать название

    h3 Список таблиц с ценами по тарифам
    .create-table-tables
      el-table.create-table-tables-list(
        :data="tables"
        :default-sort="{prop: 'date', order: 'descending'}"
      )

        el-table-column(
          type="index"
          label="№"
          width="50"
        )

        el-table-column(
          prop="name",
          label="Название"
          width="200px"
          sortable
        )
          template(slot-scope="{row: {name}}")
            span {{name | capital}}

        el-table-column(
          label="Дата"
          width="183"
          prop="date"
          sortable
        )
          template(slot-scope="{row: {date}}")
            app-time-table(:date="date")

        el-table-column(
          label="Показывать",
          prop="present"
          width="121"
        )
          template(slot-scope="{row: {present}}")
            i.el-icon-view
            span(v-if="present")  Да
            span(v-else)  Нет

        el-table-column(
          label="Действия"
          width="152"
        )
          template(slot-scope="{row}")
            el-tooltip.item(
              effect="dark"
              content="Редактировать вопрос"
              placement="top"
            )
              el-button(
                icon="el-icon-edit"
                type="info"
                circle
                @click="open(row.name)"
              )
            el-tooltip(
              effect="dark"
              content="Удалить вопрос"
              placement="top"
            )
              el-button(
                icon="el-icon-delete"
                type="danger"
                circle
                @click="remove(row._id)"
              )

</template>

<script>
import {validateForm} from '@/plugins/mixins'
import AppTimeTable from '@/components/admin/TimeTable'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  mixins: [validateForm],
  components: {AppTimeTable},
  head() {
    return {
       title: `Создать или удалить таблицу | ${process.env.appName}`
    }
  },
  async asyncData({store}) {
    const tables = await store.dispatch('tables/fetchAdmin')
    return {tables}
  },
  data() {
    return {
      loading: false,
      controls: {
        title: '',
        rows: [],
        present: false
      }
    }
  },
  methods: {
    onCreate(nameForm) {
      this.$refs[nameForm].validate(async valid => {
        if (valid) {

          await this.$confirm('Точно сохранить таблицу?', 'Внимание!', {
            confirmButtonText: 'Да, определенно',
            cancelButtonText: 'Нет',
            type: 'warning'
          })

          this.loading = true

          const formData = {
            name: this.controls.title,
            rows: this.controls.rows,
            present: this.controls.present
          }

          try {
            await this.$store.dispatch("tables/create", formData)
            this.controls.title = ''

            this.tables.push({...formData, date: new Date().toISOString()})

            this.$message.success("Таблица успешно создана!")
          } catch (e) {
          } finally {
            this.loading = false
          }
        }
      })
    },

    open(name) {
      this.$router.push(`/admin/tables/${name}`)
    },

    async remove(id) {
      try {
        await this.$confirm('Удалить Таблицу?', 'Внимание!', {
          confirmButtonText: 'Да, определенно',
          cancelButtonText: 'Нет',
          type: 'warning'
        })

        await this.$store.dispatch('tables/remove', id)
        this.tables = this.tables.filter(x => x._id !== id)

        this.$message.success('Таблица успешно удалена!')
      } catch(e) {}
      
    }
  }
}
</script>

<style lang="stylus" scoped>
.create-table
  display flex
  flex-direction column
  align-items center
  h3
    text-align center

  &-form
    max-width 800px
    margin-bottom 40px
  &-tables
    display flex
    justify-content center
    align-items center
    flex-direction column
    &-list
      width auto
      max-width 1200px

  .el-form
    min-width 400px
    
  .wrap-button
    display flex
    align-items center
    justify-content center
    margin-bottom 0
    .create-button
      margin-top 10px
</style>

