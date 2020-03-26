<template lang="pug">
  .create-question
    h2 Создание вопроса
    el-form(
      :model="controls",
      :rules="rules",
      ref="input-create",
      @submit.native.prevent="onSubmit('input-create')"
    )

      el-form-item.section(label="Выберите раздел" prop="section")
        el-select(
          v-model="controls.section"
          placeholder="Выбор раздела"
          
        )
          el-option(
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          )

      el-form-item(label="Название вопроса", prop="title")
        el-input(
          v-model="controls.title",
          @blur="controls.translit = translit(controls.title)"
        )

      el-form-item(label="Ответ на вопрос", prop="article")

        el-input(
          type="textarea"
          v-model="controls.article"
          :rows="10"
        )

      el-button.mb05rem(type="default" plain @click="previewArticle = true") Предпросмотр

      el-dialog(
        title="Предпросмотр ответа на вопрос"
        :visible.sync="previewArticle"
      )
        div(:key="controls.article")
          vue-markdown
            | {{ controls.article }}
      .mb

      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )
          span.text-button Создать вопрос
</template>

<script>
import {validateForm, showSectionsLabel, transliter} from '@/plugins/mixins'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  mixins: [validateForm, showSectionsLabel, transliter],
  head: {
    title: `Создать вопрос | ${process.env.appName}`
  },
  data() {
    return {
      loading: false,
      previewArticle: false,
      controls: {
        section: '',
        title: '',
        article: '',
        translit: ''
      }
    }
  },
  methods: {
    onSubmit(nameForm) {
      this.$refs[nameForm].validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            section: this.controls.section,
            question: this.controls.title,
            answer: this.controls.article,
            chpu: this.controls.translit
          }

          try {
            await this.$store.dispatch('questions/create', formData)

            this.controls.section = ''
            this.controls.title = ''
            this.controls.article = ''

            this.$message.success('Вопрос успешно создан!')
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
.create-question
  max-width 900px
  h2
    font-size 20px
    margin-bottom 50px
  .el-select
    overflow visible
</style>
