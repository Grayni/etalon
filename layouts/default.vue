<template lang="pug">
  el-container.main-layout
    el-header.header-menu
      transition(name='gradually')
        app-head-info.info(v-if="this.$route.path === '/'")
      .width-wrap-menu(v-if="$ua.isFromPc() && width>790" v-scroll="handleScroll" :class="{'scroll-run': isActive}")
        .wrap-menu(:class="{'scroll-hide': isActive}")
          app-navigation
      .mobile-menu-wrap(v-else)
        .hamburger(@click.stop="toogleHamburger" :class="{'open': hamburgState}")
          span
          span
          span
        .mobile-menu-contain(:class="{'contain-state': hamburgState}")
          transition(name='fades')
            .mobile-menu(v-if="hamburgState")
              app-mobile-navigation
    el-main
      transition(name='gradually')
        app-wrapper-question(v-if="(/questions/g).test(this.$route.path)")
          nuxt
        div(v-else)
          nuxt
    el-footer
      p
        span OOO 
        span(v-if="width>550") "Центр бухгалтерского обслуживания "Эталон" | 
        span(v-else) "ЦБО Эталон" | 
        span 2014 - {{new Date().getFullYear()}} | © Grayni
</template>
<script>
import AppNavigation from '@/components/main/Navigation'
import AppMobileNavigation from '@/components/main/mobileNavigation'
import AppLogo from '@/components/main/Logo'
import AppHeadInfo from '@/components/main/HeadInfo'
import AppWrapperQuestion from '@/components/elements/wrapperQuestion'
import {scrollPack, widthWatch} from '@/plugins/mixins'

export default {
  mixins: [
    scrollPack,
    widthWatch
  ],
  components: {
    AppNavigation,
    AppMobileNavigation,
    AppLogo,
    AppHeadInfo,
    AppWrapperQuestion
  },
  asyncData(context) {
    const deviceType = context.$ua.deviceType()
    return { deviceType }
  },
  data() {
    return {
      hamburgState: false,
      isActive: false
    }
  },
  methods: {
    toogleHamburger() {
      this.hamburgState = !this.hamburgState
    },
    something() {
      const deviceType = this.$ua.deviceType()
      this.deviceType = deviceType
    },
    pathExist() {
      let path = /questions/g
      console.log((/questions/g).test(this.$route.path), this.$route.path)
      return path.test(this.$route.path)
    }
  },
  mounted() {
    // scroll to begining of page with transition
    if (process.client && window) {
      window.history.scrollRestoration = 'auto'
    }
    document.addEventListener('click', () => {
      if (this.hamburgState) {
        this.toogleHamburger()
      }
    })
  }
}
</script>
<style lang="stylus">
  .main-layout
    background #fffdec
  .el-
    &header.header-menu
      padding 0
      position absolute
      width 100%
      z-index 1002
      @media (max-width 767px)
        padding-top 40px
    &main, &footer
      padding 0
    &footer
      display flex
      justify-content center
      align-items center
      background #373737
      color #b8b8b8
      font 14px h
  
  .width-wrap-menu
    display flex
    align-items center
    justify-content center
    position fixed
    width 100%
    top 60px
    transition top ease-out .4s
    &.scroll-run
      top 0
      transition top ease-in .4s
  .wrap-menu
    display flex
    width auto
    border-radius 5px
    justify-content center
    align-items stretch
    height 60px
    max-height 60px
    align-items center
    background rgb(37,37,37)
    box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    transition max-height ease .4s, background ease .4s
    &.scroll-hide
      border-radius 0 0 5px 5px
      max-height 40px
      background transparent
      transition max-height ease .4s, background ease .4s

  .reserve
    background red
    min-height 100vh
    display flex
    align-items center
    justify-content center
    border-bottom 1px solid #222

.hamburger
  width 60px
  height 45px
  position fixed
  margin 20px 0 0 15px
  transform rotate(0deg)
  transition .5s ease-in-out
  cursor pointer
  z-index 1004
  span
    display block
    position absolute
    height 3px
    width 100%
    background #429ce3
    border-radius 9px
    opacity 1
    left 0
    transform rotate(0deg)
    transition .25s ease-in-out
    &:nth-child(1)
      top 0
    &:nth-child(2)
      top 18px
    &:nth-child(3)
      top 36px
  &.open
    span
      &:nth-child(1)
        top 18px
        transform rotate(135deg)
      &:nth-child(2)
        opacity 0
        left -60px
      &:nth-child(3)
        top 18px
        transform rotate(-135deg)

.mobile-menu
  background-color #373737
  height calc(100vh + 50px)
  min-width 220px
  max-width 220px
  overflow hidden
  display flex
  justify-content center
  align-items center
  flex-direction column
  &-wrap
    position fixed
    top 0
  &-contain
    background-color #dcbc96
    &.contain-state
      width 100%
.screen-show
  opacity 1


.info
  opacity 1

.gradually
  &-enter-active
    transition opacity .5s ease .6s
  &-leave-active
    transition opacity .5s ease

  &-enter,
  &-leave-to
    opacity 0

.fades
  &-enter-active,
  &-leave-active
    transition opacity .5s, min-width .5s, max-width .5s

  &-enter,
  &-leave-to
    opacity 0
    max-width 0
    min-width 0
</style>
