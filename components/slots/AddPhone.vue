<template lang="pug">
  .wrap
    .icons(
      v-if="hide !== 'hide' && $device.isDesktop" v-for="(icon, id) in icons"
      :alt="icon.name"
      :key="id + _uid"
      :style="`width: 24px; height: 24px; background: url('social.png') ${icon.position};`"
    )
    a.number-phone(:href="`tel:+7${phone}9547013`")
      |8 (
      slot
      |) 954-70-13

</template>
<script>
export default {
  props: ['phone', 'hide'],
  data() {
    return {
      icons: [
        {
          name: 'viber',
          position: '-0 -0'
        },
        {
          name: 'whatsapp',
          position: '-24px -0'
        },
        {
          name: 'telephone',
          position: '-48px -0'
        },
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrap
  display flex
  justify-content flex-end
  align-items center
  padding 0 15px
  @media (max-width 767px)
    justify-content center
  @media (max-width 439px)
    text-shadow 0 0 3px rgba(0,0,0,.4), 0 0 5px rgba(0,0,0,.2)
.wrap a
  text-decoration none
  color #dcbc96
  font-weight bold
  font-size 24px
  margin-left 5px
  @media (max-width 1040px)
    font-size 18px
.icons
  margin-right 5px
  @media (max-width 1040px)
    width 20px
    height 20px
  @media (max-width 439px)
    display none

</style>