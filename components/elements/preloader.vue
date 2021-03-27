<template lang="pug">
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
</template>

<script>
  export default {
    data() {
      return {
        ifLoaded: false
      }
    },
    mounted() {
      this.ifLoaded = true
    },
  }
</script>

<style lang="stylus" scoped>
.preloader
  width 100%
  height 100vh
  position fixed
  pointer-events none
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
</style>
