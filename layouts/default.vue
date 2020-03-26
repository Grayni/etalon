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
    transition(name="preloader" @after-leave="reactBehavior")
      .preloader(v-if="!this.ifLoaded")
        .preloader-in
          .ball.one
            .inner
          .ball.two
            .inner
          .ball.three
            .inner
          .ball.four
            .inner
          .ball.five
            .inner
          .ball.six
            .inner
          .ball.center
            .inner

    el-container.main-layout(:class="{'show-body': ifLoaded}")
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
          app-wrapper-question(v-if="reg.test(this.$route.path)")
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
import AppBackSend from '@/components/elements/questionnaire/SendForm'
import AppNavigation from '@/components/main/Navigation'
import AppMobileNavigation from '@/components/main/MobileNavigation'
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
    AppBackSend,
    AppNavigation,
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
      scene1: null,
      scene2: null,
      scene3: null,
      scene4: null,
      scene5: null,
      scene6: null,
      scene7: null,
      tween1: null,
      tween2: null,
      tween3: null,
      tween4: null,
      tween5: null,
      tween6: null,
      tween7: null,
      changer: null
    }
  },
  watch: {
    stateStatus() {
      this.scrollMainPage()
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
    scrollMainPage () {
      this.tween1 = this.$gsap.TweenMax.fromTo('.calculator', 1.2, {opacity: 0}, { opacity: 1, overwrite: false})

      this.scene1 = new this.$scrollmagic.Scene({
        triggerElement: '.computer',
        triggerHook: 0.5,
        offset: 200
      }).setTween(this.tween1)
      this.$ksvuescr.$emit('addScene', 'computer', this.scene1)


      this.tween2 = this.$gsap.TweenMax.fromTo('.first-offers', .8,{left: '10vw', opacity: 0, width: '94vw'}, { left: '4vw', opacity: 1, width: '100vw', overwrite: false, immediateRender: false})

      this.scene2 = new this.$scrollmagic.Scene({
        triggerElement: '.offers',
        triggerHook: 'onLeave',
        offset: -200
      }).setTween(this.tween2)
      this.$ksvuescr.$emit('addScene', 'offers', this.scene2)


      this.tween3 = this.$gsap.TweenMax.fromTo('.second-offers', .8,{right: '10vw', opacity: 0, width: '94vw'}, { right: '4vw', opacity: 1, width: '100vw', overwrite: false, immediateRender: false})

      this.scene3 = new this.$scrollmagic.Scene({
        triggerElement: '.second-offers',
        triggerHook: 'onLeave',
        offset: -200
      }).setTween(this.tween3)
      this.$ksvuescr.$emit('addScene', 'offers2', this.scene3)


      this.tween4 = this.$gsap.TweenMax.fromTo('.tab-content', .8,{opacity: 0}, {opacity: 1, overwrite: false, immediateRender: false})

      this.scene4 = new this.$scrollmagic.Scene({
        triggerElement: '.wrap-tab-content',
        triggerHook: 0.5,
        offset: 200
      }).setTween(this.tween4)
      this.$ksvuescr.$emit('addScene', 'tab', this.scene4)


      this.tween5 = this.$gsap.TweenMax.fromTo('.need', .8,{opacity: 0}, {opacity: 1, overwrite: false, immediateRender: false})

      this.scene5 = new this.$scrollmagic.Scene({
        triggerElement: '.need',
        triggerHook: 0.5
      }).setTween(this.tween5)
      this.$ksvuescr.$emit('addScene', 'need', this.scene5)


      this.tween6 = this.$gsap.TweenMax.fromTo('#logo-name', .8,{opacity: 1, scale: 1, top: '0'}, {opacity: 0, scale: .8, top: '60vh'})

      this.scene6 = new this.$scrollmagic.Scene({
        triggerElement: '.phrase',
        triggerHook: 1,
        duration: '200%'
      }).setTween(this.tween6)
      this.$ksvuescr.$emit('addScene', 'logo', this.scene6)
    },
    hideBackForm() {
      this.$store.commit('showChange')
      this.$store.commit('sendings/dataMail', {})
    },
    toogleHamburger() {
      this.hamburgState = !this.hamburgState
    },
    something() {
      const deviceType = this.$ua.deviceType()
      this.deviceType = deviceType
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
    background red
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
.preloader
  width 100%
  height 100vh
  position fixed
  display flex
  justify-content center
  align-items center
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  &-enter-active,
  &-leave-active
    transition opacity .5s ease 1s

  &-enter,
  &-leave-to
    opacity 0

  &-in
    position absolute
    width 300px
    height 100px
    left 50%
    top 50%
    margin-left -150px
    margin-top -50px
    border-radius 20px
    .ball
      position absolute
      width 0
      height 100%
      left -15px
      bottom 0
      background #4a9
      opacity 0
      animation:moveBall 2.8s infinite linear
      &.one
        animation-delay 0s
      &.two
        animation-delay 0.2s
      &.three
        animation-delay 0.4s
      &.four
        animation-delay 0.6s
      &.five
        animation-delay 0.8s
      &.six
        animation-delay 1s

      .inner
        height 30px
        width 30px
        position absolute
        background #999
        bottom 0
        left 0
        margin-left -15px
        border-radius 100%

      &.center
        left 50%
        top 50%
        background none
        animation centerBall 2.8s infinite cubic-bezier(0.55, 0.055, 0.675, 0.19)
        .inner
          top -15px

        @keyframes centerBall
          25%, 75%, 100%
            opacity 0
            animation-timing-function cubic-bezier(0.515, 0.61, 0.355, .45)
          0%
            opacity .1

      @keyframes moveBall
        0%
          left -10%
          opacity 0
          -webkit-animation-timing-function cubic-bezier(0.55, 0.085, 0.68, 0.53)
          animation-timing-function cubic-bezier(0.55, 0.085, 0.68, 0.53)
        10%
          opacity 0
        28.7%
          transform rotate(-180deg)
          left 50%
          opacity 1
          animation-timing-function linear
        71.3%
          transform rotate(180deg)
          left 50%
          opacity 1
          animation-timing-function cubic-bezier(0.25, 0.46, 0.45, 0.94)
        90%
          opacity 0
        100%
          left 110%
          transform rotate(deg)
          opacity 0

.main-layout
  background #fffdec
  opacity 0
  transition opacity .5s ease
  position relative
  z-index 2

  &.show-body
    opacity 1
    transition opacity .5s ease
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
