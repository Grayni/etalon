<template lang="pug">
  .page-wrap
    app-breadcrumb(:way="data")
    h2 Редактор статьи
    el-form(
      :model="controls",
      :rules="rules",
      ref="input-article",
      @submit.native.prevent="onSubmit('input-article')"
    )
      el-form-item.name-service(label="Изменение названия статьи" prop="title")
        el-input.input-service(v-model="controls.title")

      el-form-item(label="Текст в формате .md или .html", prop="article")
        el-input(
          type="textarea"
          v-model="controls.article"
          :rows="10"
        )

      .mb
        small
          i.el-icon-time
          span  {{article.date | date}}

        small.ml
          i.el-icon-view
          span  {{article.views}}

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
      title: `Статья | ${this.article.title} | ${process.env.appName}`
    }
  },
  mixins: [validateForm, validateId],
  components: {
    AppBreadcrumb
  },
  async asyncData({store, params}) {
    const article = await store.dispatch('articles/fetchAdminById', params.id)
    return {article}
  },
  data() {
    return {
      data: {
        path: '/admin/articles-list',
        name: 'Список статей',
        title: ''
      },
      loading: false,
      controls: {
        title: '',
        article: ''
      }
    }
  },
  methods: {
    onSubmit(nameForm) {
      this.$refs[nameForm].validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            text: this.controls.article,
            title: this.controls.title,
            id: this.article._id
          }

          try {
            await this.$store.dispatch('articles/update', formData)
            this.$message.success('Статья обновлена!')
          } catch(e) {} finally {
            this.loading = false
          }
        }
      })
    }
  },
  created() {
    this.data.title = this.article.title
    this.controls.title = this.article.title
    this.controls.article = this.article.text
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap
  max-width 900px
  .ml
    margin-left 2rem
  h2
    font-size 20px
    margin-top 50px
</style>
