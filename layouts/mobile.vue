<template lang="pug">
  .wrapper-conts
    el-row
      transition(name="fade")
        el-col.fly-box(v-if="$store.state.show")
          el-card.box-card
            .wrap-header-card
              span.cross(@click="hideBackForm")
            .content-block
              .line-container
                .line
            .wrap-content
              app-back-send

    el-container.main-layout(:class="{'show-body': ifLoaded}")
      el-header.header-menu
        transition(name='gradually')
          app-head-info.info(v-if="this.$route.path === '/'")
        .mobile-menu-wrap
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
          app-wrapper-question(v-if="reg.test(this.$route.path)")
            nuxt
          div(v-else)
            nuxt
      el-footer
        p
          span OOO 
          span "ЦБО Эталон" | 
          span.date-footer 2014 - {{new Date().getFullYear()}} | © Grayni
</template>
<script>
import AppBackSend from '@/components/elements/questionnaire/SendForm'
import AppMobileNavigation from '@/components/main/MobileNavigation'
import AppLogo from '@/components/main/Logo'
import AppHeadInfo from '@/components/main/HeadInfo'
import AppWrapperQuestion from '@/components/elements/wrapperQuestion'

export default {
  components: {
    AppBackSend,
    AppMobileNavigation,
    AppLogo,
    AppHeadInfo,
    AppWrapperQuestion
  },
  data() {
    return {
      ifLoaded: false,
      loaded: false,
      hamburgState: false,
      isActive: false,
      reg: new RegExp('^(\/questions)'),
      activeCard: false,
      offAnimation: false,
      changer: null
    }
  },
  computed: {
    stateStatus() {
      this.changer = this.$store.state.mainPage
      return this.changer
    }
  },
  methods: {
    reactBehavior() {
      this.$store.commit('activeAnimation')
    },
    hideBackForm() {
      this.$store.commit('showChange')
      this.$store.commit('sendings/dataMail', {})
    },
    toogleHamburger() {
      this.hamburgState = !this.hamburgState
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
    this.ifLoaded = true
  }
}
</script>
<style lang="stylus">
.wrapper-conts
  .fly-box
    .box-card
      height auto
      @media (max-height 480px)
        height 100vh
        max-height 100vh
        overflow-y scroll

  .el-card__body
    display flex
    align-items center
    justify-content center
    flex-direction column
  .wrap-send-form
    position fixed
    width 100vw
    height 100vh
    display flex
    justify-content center
    align-items center
    flex-direction column
    z-index 20000
    .box-send
      background #373737
      min-width 400px
      border-radius 4px
  .wrap-header-card
    justify-content flex-end
    width 100%
  .content-block
    width 100%
    .line-container
      margin-top 10px
      width 100%
      height 2px
      .line
        width 100%
  .wrap-content
    display flex
    justify-content center
    align-items center
    flex-direction column
    flex 1 1 auto
.main-layout
  background #fffded
  opacity 0
  transition opacity .2s ease
  position relative
  z-index 2
  &.show-body
    opacity 1
    transition opacity .2s ease
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
    .date-footer
      margin-left 3px
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
