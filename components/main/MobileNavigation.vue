<template lang="pug">
  el-menu.menu(
      mode="vertical"
      backgroundColor="transparent"
      text-color="#b8b8b8"
      active-text-color="#dcbc96"
    )
      el-menu-item.item(
        v-for="(item, idx) in items"
        :key="idx"
        :index="idx+1+''"
        :route="item.link"
        ref="element"
      )
        nuxt-link.el-link.link(
          ref="menu"
          :underline="false"
          :to="item.link"
        ) {{item.name}}
      app-add-phone.menu-mobile-phone(style="white-space: nowrap" :hide="display")
        | 921
</template>

<script>
import AppAddPhone from '~/components/slots/AddPhone'
export default {
  components: {
    AppAddPhone
  },
  data() {
    return {
      display: 'hide',
      items: [
        { name: 'Главная', link: '/' },
        { name: 'Услуги', link: '/services' },
        { name: 'Вопросы', link: '/questions' },
        { name: 'Акции', link: '/stocks' },
        { name: 'Статьи', link: '/articles' },
        { name: 'Контакты', link: '/contacts' }
      ]
      
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-menu.menu
  border-right none
  width 100%
  margin-top 50px
  @media (max-height 600px)
    margin-top 0
  li
    border-right none
    display flex
    justify-content center
    align-items flex-start
    flex-direction column
    padding 0!important
    @media (max-height 600px)
      height 50px
    @media (max-height 435px)
      height 30px
    a
      display flex
      width 100%
      height 100%
      justify-content flex-start
      padding 0 20px
      color #fffdec
      font 24px h
      text-transform uppercase
      &:hover
        background-color #dcbc96
      @media (max-height 600px)
        font-size 22px
      @media (max-height 435px)
        font-size 16px
.menu-mobile-phone
  margin-top 20px
  display flex
  justify-content center
</style>
