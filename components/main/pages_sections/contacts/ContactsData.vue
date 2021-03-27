<template lang="pug">
  ul
    li.city
      i.el-icon-position
      span Спб, ул. Коли Томчака, <br> д. 28А, эт.4, оф. 403
    li.metro
      span.contact-metro
      span.inf м. Московские ворота
    li
      p
        i.el-icon-phone 
        a(href="tel:+79219547013") 8 (921) 954-70-13
      p
        i.el-icon-phone
        a(href="tel:+78129547013") 8 (812) 954-70-13
    li
      i.el-icon-message
      span.inf-email cbo.etalon@gmail.com
    li.time
      i.el-icon-time
      p
        span пн-пт: 10:00-18:00 <br>
        span сб-вс: выходной
    

</template>

<script>
</script>

<style lang="stylus" scoped>
  li
    list-style-type none
    font 30px 'h'
    margin-bottom 30px
    margin-right 30px
    @media (max-width 767px)
      font-size 20px
    i:before
      margin-right 10px
    a
      text-decoration none
      color #000
    &.time, &.city
      display flex
      justify-content flex-start
      align-items center
  .metro
    display flex
    align-items center
    justify-content flex-start
  .contact-metro
    display block
    position relative
    background-image url('/icons/metro.png')
    background-size 26px 30px
    background-repeat no-repeat
    width 26px
    min-width 26px
    height 30px
    margin-right 10px
    @media (max-width 767px)
      min-width auto
      width 20px
      height 21px
      background-size 20px 21px
    
  .el-icon-message
    @media (min-width 768px) and (max-width 1179px)
      display none

</style>