<template lang="pug">
  .create-comment
    .create-comment-in
      el-form(
          :model="controls",
          :rules="rules",
          ref="create-comment",
          @submit.native.prevent="onSubmit('create-comment')"
      )
        h3.add-comment Добавить комментарий
        el-form-item(label="Ваше имя", prop="name")
          el-input(v-model="controls.name")
    
        el-form-item(label="Текст комментария" prop="text")
          el-input(
            v-model="controls.text"
            type="textarea"
            resize="none"
            :rows="2"
          )
        el-form-item.button-wrap
          el-button(
            type="default"
            native-type="submit"
            :loading="loading"
          )
            span.text-button Добавить комментарий
</template>

<script>
import {validateForm} from '@/plugins/mixins'
export default {
  mixins: [validateForm],
  data() {
    return {
      loading: false,
      controls: {
        name: '',
        text: ''
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: ''
          }

          try {
            this.$emit('created')
            this.$message.success('Комментарий успешно отправлен на модерацию!')
          } catch (e) {
            this.loading = false
          }
        }
        
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.create-comment
  border-radius 4px
  &-in
    background-color rgba(55,55,55,.3)
    padding 20px
    box-shadow 0 0 2px rgba(255,253,236,.4)
.add-comment
  color #777
  font normal 14px h
  text-align left
  text-transform uppercase
  margin-top 0
.button-wrap
  display flex
  justify-content center
  margin 0
  .el-button
    background-color transparent
    color rgba(255,253,236,.4)
    border 1px dotted rgba(255,253,236,.4)
    transition all .5s ease
    font-size 12px
    line-height 1
    .text-button
      letter-spacing 4px
    &:hover
      color #dcbc96
      background-color rgba(255,253,236,.1)
      border-color #dcbc96
      transition all .5s ease
</style>
