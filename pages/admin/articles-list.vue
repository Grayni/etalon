<template lang="pug">
  .articles-list
    h3 Список статей
    el-table(
      :data="articles"
      :default-sort="{prop: 'date', order: 'descending'}"
    )
      el-table-column(
        type="index"
        label="№"
        width="50"
      )
      el-table-column(
        prop="title",
        label="Название"
        width="auto"
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
        label="Комментарии",
        prop="comments"
        sortable
        width="138"
      )
        template(slot-scope="{row: {comments}}")
          i.el-icon-chat-round
          span  {{ comments.length }}

      el-table-column(
        label="Действия"
        width="152"
      )
        template(slot-scope="{row}")
          el-tooltip.item(
            effect="dark"
            content="Редактировать статью"
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
            content="Удалить статью"
            placement="top"
          )
            el-button(
              icon="el-icon-delete"
              type="danger"
              circle
              @click="remove(row._id, row.imageUrl)"
            )

</template>

<script>
import AppTimeTable from '@/components/admin/TimeTable'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Список статей | ${process.env.appName}`
  },
  components: {
    AppTimeTable
  },
  async asyncData({store}) {
    // get Array data
    const articles = await store.dispatch('articles/fetchAdmin')
    return {articles}
  },
  methods: {

    open(id) {
      this.$router.push(`/admin/articles/${id}`)
    },

    async remove(id, imageUrl) {
      const formData = {id, imageUrl}

      try {
        await this.$confirm('Удалить статью?', 'Внимание!', {
          comfirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })

        await this.$store.dispatch('articles/remove', formData)
        this.articles = this.articles.filter(x=> x._id !== id)

        this.$message.success('Статья успешно удалена!')
      } catch(e) {}
    },

    test(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.articles-list
  width 100%
  display flex
  justify-content center
  flex-direction column
  align-items center
  .el-table
    max-width 1200px
</style>
