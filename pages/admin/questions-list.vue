<template lang="pug">
  .questions-list
    h3 Список вопросов
    el-table(
      :data="questions"
      :default-sort="{prop: 'date', order: 'descending'}"
    )

      el-table-column(
        type="index"
        label="№"
        width="50"
      )
      
      el-table-column(
        prop="section",
        label="Раздел"
        width="200px"
        sortable
      )
        template(slot-scope="{row: {section}}")
          span {{ showSection(section) }}
      el-table-column(
        prop="question",
        label="Вопрос"
        min-width="300px"
        width="auto"
        sortable
      )

      el-table-column(
        label="Дата"
        sortable
        width="183"
      )
        template(slot-scope="{row: {date}}")
          app-time-table(:date="date")

      el-table-column(
        label="Просмотры",
        prop="views"
        sortable
        width="121"
      )
        template(slot-scope="{row: {views}}")
          i.el-icon-view
          span  {{ views }}

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
              @click="open(row._id)"
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
import AppTimeTable from '@/components/admin/TimeTable'
import {showSectionsLabel} from '@/plugins/mixins'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  mixins: [showSectionsLabel],
  head() {
    return {
      title: `Список вопросов | ${process.env.appName}`,
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
    AppTimeTable
  },
  async asyncData({store}) {
    // get Array data
    const questions = await store.dispatch('questions/fetchAdmin')
    return {questions}
  },
  methods: {

    open(id) {
      this.$router.push(`/admin/questions/${id}`)
    },

    async remove(id) {
      try {
        await this.$confirm('Удаляем?', 'Внимание!', {
          confirmButtonText: 'Да, определенно',
          cancelButtonText: 'Нет',
          type: 'warning'
        })

        await this.$store.dispatch('questions/remove', id)
        this.questions = this.questions.filter(x=> x._id !== id)

        this.$message.success('Вопрос успешно удален!')
      } catch(e) {}
    },
  
    showSection(section) {
      const needValue = this.options.filter(x => x.value === section)[0]
      return needValue.label
    }
  }
}
</script>

<style lang="stylus" scoped>
.questions-list
  width 100%
  display flex
  justify-content center
  flex-direction column
  align-items center
  .el-table
    max-width 1200px
</style>
