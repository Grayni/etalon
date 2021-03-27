<template lang="pug">
  .create-article
    h2 Создание статьи
    el-form(
      :model="controls",
      :rules="rules",
      ref="create-article",
      @submit.native.prevent="onSubmit('create-article')"
    )
      el-form-item.name-service(label="Название статьи" prop="title")
        el-input.input-service(v-model="controls.title")

      el-form-item.name-service(label="Краткое описание (для SEO). Желательно с ключевой фразой." prop="description")
        el-input.input-service(v-model="controls.description")

      el-form-item.name-service(label="Ключевые фразы (для SEO)." prop="keys")
        el-input.input-service(v-model="controls.keys")

      el-form-item(label="Текст в формате .md или .html", prop="article")
        el-input(
          type="textarea"
          v-model="controls.article"
          :rows="10"
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
        ref="upload"
        :auto-upload="false"
      )
        i.el-icon-upload
          .el-upload__text Перетащите картинку <em>или нажмите</em>
          .el-upload__tip(slot="tip") Файлы с расширением jpg/png не более 500kb

      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )
          span.text-button Создать статью
</template>

<script>
  import { validateForm, transliter } from "@/plugins/mixins"
  export default {
    head() {
      return {
        title: `Создать статью | ${process.env.appName}`,
        meta: [
          {
            hid: `noindex-${this.$route.name}`,
            name: 'robots',
            content: 'noindex'
          }
        ]
      }
    },
    layout: "admin",
    middleware: ["admin-auth"],
    mixins: [validateForm, transliter],
    data() {
      return {
        image: null,
        loading: false,
        previewArticle: false,
        controls: {
          title: '',
          description: '',
          keys: '',
          article: ''
        }
      };
    },
    methods: {
      onSubmit(nameForm) {
        this.$refs[nameForm].validate(async valid => {
          if (valid && this.image) {
            this.loading = true

            const formData = {
              title: this.controls.title,
              chpu: this.translit(this.controls.title),
              description: this.controls.description,
              keys: this.controls.keys.split(', '),
              text: this.controls.article,
              image: this.image
            };

            try {
              await this.$store.dispatch("articles/create", formData)

              this.controls.title = ""
              this.controls.description = "",
              this.controls.keys = "",
              this.controls.article = ""
              this.image = null

              this.$refs.upload.clearFiles()
              this.$message.success("Статья успешно создана!")
            } catch (e) {
            } finally {
              this.loading = false
            }
          } else {
            this.$message.error("Загрузите изображение!")
            return false
          }
        })
      },
      handleImageChange(file, fileList) {
        this.image = file.raw
      }
    }
  }
</script>

<style lang="stylus">
@import '../../assets/article.styl'

.create-article
  max-width: 1200px
  h2
    font-size: 20px

  #d1
    min-height: 1400px

  .mb
    padding-bottom: 20px
    margin-top: 40px

    &05rem
      margin-top 14px
</style>
