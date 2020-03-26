<template lang="pug">
  el-tooltip(:content="title" placement="top")
    .add-service(v-if="urls")
      nuxt-link(:to="urls")
        i.el-icon-plus
    .add-service(v-else)
      i.el-icon-plus
</template>

<script>
export default {
  props: {
    urls: {
      type: String
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-service
  padding-top 20px
  cursor pointer
  display flex
  justify-content center
  i
    font-size 50px
    color #68afe5
    animation sign-rotate 5s ease-in-out infinite
    &:hover
      color #dcbc96

@keyframes sign-rotate
  0%
    transform rotate(-15deg)
  50%
    transform rotate(15deg)
  100%
    transform rotate(-15deg)
</style>
