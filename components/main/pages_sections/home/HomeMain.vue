<template lang="pug">
  el-row.home-section
    el-col.year(:span="0" :lg="6")
      p {{new Date().getFullYear()}}
    el-col.name#logo-name(:xs="24" :lg="12")
      .logo-mobile-wrap(v-if="width<791 || (!$ua.isFromPc() && width>790)")
        app-logo(:size="box")
      h1 Etalon
      .wrap-sub
        h3 Центр бухгалтерского обслуживания
</template>
<script>
let kute, kuteCSS

if (process.client) {
  kute = require('kute.js')
  kuteCSS = require('kute.js/kute-css')

}

import AppLogo from '~/components/main/Logo'
import {widthWatch} from '~/plugins/mixins'
export default {
  data() {
    return {
      box: [150, 134],
      timeKute: null,
      tweenKute: null
    }
  },
  mixins: [
    widthWatch
  ],
  components: {
    AppLogo
  },
  methods: {
    animationInfo() {
      this.timeKute = kute
      this.tweenKute = this.timeKute.fromTo('#logo-name',{scale:'0.93', opacity: '0'}, {scale: '1', opacity: '1'}, {offset: 200, duration: 500}).start()
    }
  },
  mounted() {
    this.animationInfo()
  }
}
</script>
<style lang="stylus" scoped>
.home-section
.el-row
  background-color #464646
  background-image url('/first.png')
  background-size cover
  padding-top 170px
  min-height 100vh
  display flex
  align-items stretch
  @media (max-width 767px)
    height 550px
  @media (max-width 900px)
    padding-top 0
  .el-col
    display flex
    text-transform uppercase
    flex-direction column
    &.year
      justify-content flex-end
      margin-bottom 60px
      @media (max-width 440px) and (max-height 670px), (max-height 444px)
        display none
      p
        transform rotate(45deg)
        font bold 30px 'Verdana'
        color #373737
        text-shadow 4px 4px 5px rgba(0,0,0,.2)
        padding-left 15px
    &#logo-name
      justify-content center
      padding-bottom 18vh
      transform scale(0.5)
      opacity 0
      position relative
      top 0
      @media (max-width 900px)
        padding 0
      h3, h1
        margin 0
        padding 0
        text-align center
      h1
        color #dcbc96
        font 8rem 'h'
        letter-spacing 8px
        padding-left 4px
        @media (max-width 1090px)
          text-shadow 0 0 10px rgba(0,0,0,.4)
          font-size 4rem
      .wrap-sub
        display flex
        justify-content center
        margin-top 10px
      h3
        font bold 1rem h
        color #b8b8b8
        letter-spacing 3px
        color #429CE3
        border 1px solid #429CE3
        border-left 0px solid transparent
        border-right 0px solid transparent
        border-bottom 1px solid #429CE3
        padding 5px 50px
        display block
        word-spacing 20px
        @media (max-width 1090px)
          font-size 0.7rem
        @media (max-width 850px)
          background-color #252525
          word-spacing 10px
        @media (max-width 443px)
          word-spacing 0
          line-height 18px
.logo-mobile
  &-wrap
    width 100%
    display flex
    justify-content center
    align-items center
    flex-direction column
    margin-top 20px
    @media (max-width 440px)
      margin-top 60px
     @media (max-width 440px) and (max-height 670px)
      margin-top 140px
</style>