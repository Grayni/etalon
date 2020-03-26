<template lang="pug">
  .page-wrap
    app-breadcrumb(:way="data")
    h2 Редактор вопросов
    el-form(
      :model="controls",
      :rules="rules",
      ref="input-question",
      @submit.native.prevent="onSubmit('input-question')"
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
          @blur="controls.chpu = translit(controls.title)"
        )

      el-form-item(label="Текст в формате .md или .html", prop="article")
        el-input(
          type="textarea"
          v-model="controls.article"
          :rows="10"
        )

      .mb
        small
          i.el-icon-time
          span  {{question.date | date}}

        small.ml
          i.el-icon-view
          span  {{question.views}}

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
import {validateId, validateForm, showSectionsLabel, transliter} from '@/plugins/mixins'
export default {
  layout: 'admin',
  middleware: 'admin-auth',
  head() {
    return {
      title: `Вопрос | ${this.question.title} | ${process.env.appName}`
    }
  },
  mixins: [validateId, validateForm, showSectionsLabel, transliter],
  components: {
    AppBreadcrumb
  },
  async asyncData({store, params}) {
    const question = await store.dispatch('questions/fetchAdminById', params.id)
    return {question}
  },
  data() {
    return {
      loading: false,
      controls: {
        section: '',
        title: '',
        article: '',
        date: '',
        chpu: ''
      },
      data: {
        path: '/admin/questions-list',
        name: 'Список вопросов',
        title: ''
      },
      value: ''
    }
  },
  methods: {
    onSubmit(nameForm) {
      this.$refs[nameForm].validate(
        async valid => {
          if (valid) {
            this.loading = true

            const formData = {
              section: this.controls.section,
              question: this.controls.title,
              answer: this.controls.article,
              id: this.question._id,
              chpu: this.controls.chpu
              // id: this.question._id
            }
            
            try {
              await this.$store.dispatch('questions/update', formData)
              this.$message.success('Вопрос успешно обновлен!')
            } catch(e) {} finally {
              this.loading = false
            }
          }
        })
    }
  },
  created() {
    this.data.title = this.question.question
    this.controls.section = this.question.section
    this.controls.title = this.question.question
    this.controls.article = this.question.answer
    this.controls.chpu = this.question.chpu
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
  .section
    margin-top 50px
</style>
