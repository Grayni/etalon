<template lang="pug">
  .admin-article
    app-breadcrumb(:way="data")
    h2.admin-article-title Редактор статьи
    el-form(
      :model="controls",
      :rules="rules",
      ref="input-article",
      @submit.native.prevent="onSubmit('input-article')"
    )
      el-form-item.name-service(label="Изменение названия статьи" prop="title")
        el-input.input-service(v-model="controls.title")

      el-form-item.name-service(label="Изменить описание" prop="description")
        el-input.input-service(v-model="controls.description")

      el-form-item.name-service(label="Изменить ключевые слова" prop="keys")
        el-input.input-service(v-model="controls.keys")

      el-form-item(label="Текст в формате .md или .html", prop="article")
        el-input(
          type="textarea"
          v-model="controls.article"
          :rows="30"
        )

        el-button.mb05rem(type='default' plain @click="previewArticle = true") Предпросмотр

        el-dialog(
          title="Предпросмотр статьи"
          :visible.sync="previewArticle"
        )
          div(:key="controls.article")
            vue-markdown.mark-style
              | {{ controls.article }}

        el-upload.mb(
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleImageChange"
          :on-remove="clearImage"
          ref="upload"
          :auto-upload="false"
        )
          i.el-icon-upload
            .el-upload__text Перетащите картинку <em>или нажмите</em>
            .el-upload__tip(slot="tip") Файлы с расширением jpg/png не более 500kb

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
import {validateForm, validateId, transliter} from '@/plugins/mixins'
export default {
  layout: 'admin',
  middleware: 'admin-auth',
  head() {
    return {
      title: `Статья | ${this.article.title} | ${process.env.appName}`,
      meta: [
        {
          hid: `noindex-${this.article._id}`,
          name: 'robots',
          content: 'noindex'
        }
      ]
    }
  },
  mixins: [validateForm, validateId, transliter],
  components: {
    AppBreadcrumb
  },
  async asyncData({store, params}) {
    const article = await store.dispatch('articles/fetchAdminById', params.id)
    return {article}
  },
  data() {
    return {
      previewArticle: false,
      image: null,
      data: {
        path: '/admin/articles-list',
        name: 'Список статей',
        title: ''
      },
      loading: false,
      controls: {
        title: '',
        description: '',
        article: '',
        keys: ''
      }
    }
  },
  methods: {
    onSubmit(nameForm) {
      this.$refs[nameForm].validate(async valid => {
        if (valid) {
          this.loading = true

          let date = new Date().toISOString()

          let formData = {}
          if (Boolean(this.image)) {
            formData = {
              title: this.controls.title,
              description: this.controls.description,
              keys: this.controls.keys.split(', '),
              text: this.controls.article,
              image: this.image,
              id: this.article._id,
              date
            }
          } else {
            formData = {
              title: this.controls.title,
              description: this.controls.description,
              keys: this.controls.keys.split(', '),
              text: this.controls.article,
              id: this.article._id,
              date
            }
          }

          try {
            this.article.date = date
            await this.$store.dispatch('articles/update', formData)
            this.$message.success('Статья обновлена!')
          } catch(e) {} finally {
            this.loading = false
          }
        }
      })
    },
    handleImageChange(file, fileList) {
      this.image = file.raw
    },
    clearImage() {
      this.image = null
    }
  },
  created() {
    this.data.title = this.article.title
    this.controls.title = this.article.title
    this.controls.article = this.article.text
    this.controls.description = this.article.description

    // add field of keys later...
    if (this.article.keys) {
      this.controls.keys = this.article.keys.join(', ')
    }

  }
}
</script>

<style lang="stylus">
@import "../../../assets/article.styl"
.admin-article
  max-width 1400px
  .ml
    margin-left 2rem
  .mb
    &05rem
      margin-top 14px
  &-title
    font-size 20px
    margin-top 50px
</style>
