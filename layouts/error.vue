<template lang="pug">
  .famous-wrap
    .error-layout
      .error-content
        el-card.error-card
          img.error-logo(src="/logo.svg" alt="Логотип компании ЦБО Эталон")
          .error-card-content
            h1.error-title Ошибка 404
            nuxt-link.error-back(to="/") Веренуться на главную
</template>

<script>
export default {
  head: {
    title: 'Ошибка 404'
  }
}
</script>

<style lang="stylus" scoped>
.famous-wrap
  display flex
.error
  &-layout
    display flex
    justify-content center
    align-items center
    width 100%
    flex 1 1 auto
  &-title
    font-weight normal
    color #fffdec
    margin 0
    padding-bottom 12px
    border-bottom 2px solid #fffdec
    border-radius 0 0 2px 2px
  &-card
    padding 30px 40px 20px 40px
    background #252525
    position relative
    &.el-card
      border none
      box-shadow 0 0 8px 2px rgba(55,55,55,.6)
    &-content
      position relative
      z-index 2
  &-back
    display inline-block
    font 14px h
    color #429ce3
    text-transform uppercase
    text-decoration none
    padding-top 14px
    &:hover
      color #dcbc96
  &-logo
    position absolute
    top 0
    left 20%
    width 180px
    opacity .1
    transform skew(-50deg, 20deg)
</style>
