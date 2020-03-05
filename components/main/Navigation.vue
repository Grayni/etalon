<template lang="pug">
  el-menu.menu(
    router
    :default-active="$route.path"
    mode="horizontal"
    backgroundColor="transparent"
    text-color="#b8b8b8"
    active-text-color="#dcbc96"
  )
    el-menu-item.item(
      v-for="(item, idx) in items[0]"
      :key="idx"
      :index="'/'+item.link"
    )
      //-:index="idx+1+''"
      nuxt-link.el-link.link(
        ref="menu1"
        :underline="false"
        :to="item.link"
      ) {{item.name}}
    transition(name="fade")
      .element-logo(v-if="!isActive")
        app-logo.logo(
          v-scroll="handleScroll",
          :size="box"
        )

    el-menu-item.item(
      v-for="(item, idx) in items[1]"
      :key="idx+4"
      :index="'/'+item.link"
    )
      nuxt-link.el-link.link(
        :underline="false"
        :to="item.link"
      ) {{item.name}}
</template>
<script>
import AppLogo from '~/components/main/Logo'
import {scrollPack} from '~/plugins/mixins'
export default {
  mixins: [scrollPack],
  components: {
    AppLogo
  },
  data() {
    return {
      box: [112, 100],
      items: [
        [
          { name: 'Главная', link: '' },
          { name: 'Услуги', link: 'services' },
          { name: 'Вопросы', link: 'questions' }
        ],
        [
          { name: 'Акции', link: 'stocks' },
          { name: 'Статьи', link: 'articles' },
          { name: 'Контакты', link: 'contacts' }
        ]
      ]
      
    }
  }
  // watch: {
  //   $route () {
  //     this.changeTab()
  //   }
  // },
  // methods: {
  //   clickLogo() {
  //     this.$refs.menu1[0].$el.click()
  //   },
  //   changeTab() {
  //     const [menuItems] = this.$refs.menu1
  //       .concat(this.$refs.menu2)
  //       .filter(x=>x.to === this.$route.path)

  //     if (menuItems) menuItems.$el.click()
  //   }
  // },
  // mounted() {
  //   this.changeTab()
  // }
}
</script>
<style lang="stylus" scoped>
.menu
  background transparent
  border-bottom transparent
  display flex
  background red
  height 100%
.item
  font 14px 'h', 'Trebuchet MS'
  line-height 60px
  height 100%
  padding 0
  display flex
  letter-spacing 2px
  justify-content center
  align-items center
  flex-direction column
  &:hover
    background #363636!important
  &:first-child
    border-radius 5px 0 0 5px
  &:last-child
    border-radius 0 5px 5px 0
.link
  height 100%
  width 100%
  padding 0 20px
  display flex
  justify-content center
  align-items center
.element-logo
  display flex
  align-self center
  max-width 130px
  outline-style: none
.logo
  opacity 1
  cursor pointer
  &.scroll-hide
    opacity 0

.fade
  &-enter-active
    transition max-width .5s ease, opacity .5s ease .4s
  &-leave-active
    transition opacity .3s ease, max-width .4s ease .17s

  &-enter,
  &-leave-to
    max-width 0
    opacity 0

</style>