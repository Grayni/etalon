<template lang="pug">
  el-row.become
    el-col(:span="24")
      .wrap-name
        app-title Начало сотрудничества
      el-tabs(
        v-model="activeName"
        :stretch="true"
      )

        el-tab-pane#tab-begin(
          name="begin"
        )
          span(slot="label")
            i.el-icon-tickets.label {{tabs.names[0]}}
          .wrap-tab-content
            .tab-content(:class="{'mobi-tab-content': !$device.isDesktop}")
              .block-items(v-for="(tab, id) in tabs.begin" :key="id+_uid")
                .item-wrap
                  span.item-circle {{id+1}}
                  span.item-text {{tab}}
                .item-arrow(v-if="id !== 6")
                  i.el-icon-right
        el-tab-pane#tab-process(
          name="process"
        )
          span(slot="label")
            i.el-icon-tickets.label {{tabs.names[1]}}
          .wrap-tab-content
            .tab-content(:class="{'mobi-tab-content': !$device.isDesktop}")
              .block-items(v-for="(tab, id) in tabs.process" :key="id+_uid")
                .item-wrap
                  span.item-circle {{id+1}}
                  span.item-text {{tab}}
                .item-arrow(v-if="id !==6")
                  i.el-icon-right
</template>

<script>
import AppTitle from '~/components/slots/Title'
export default {
  data() {
    return {
      activeName: 'begin',
      tabs: {
        names: [
          'Начало деятельности',
          'Уже в деле'
        ],
        begin: [
          'Бесплатный подбор наиболее выгодной системы налогообложения',
          'Помощь в выборе наиболее подходящего тарифа и предлагаемых услуг',
          'Бесплатная регистрация фирмы при заключении договора на 1 год!',
          'Дарим ключ для сдачи электронной отчетности на 1 год!',
          '1 месяц бухгалтерского обслуживания в подарок!',
          'Заключаем договор с гарантийными обязательствами и приступаем к сотрудничеству!',
          'Спустя год Вы становитесь нашим особым клиентом с индивидуальными скидками'
        ],
        process: [
          'Бесплатный анализ бухгалтерской составляющей в вашей компании',
          'Проконсультируем и посоветуем для Вас более выгдные услуги и тариф',
          'Подарим 1 месяц бухгалтерского обслуживания при заключении договора на год',
          'Предоставим ключ для сдачи электронной отчетности на 1 год!',
          'Поможем правильно перенести бухгалтерию от предыдущего бухгалтера',
          'Заключаем договор с гарантийными обязательствами и приступаем к сотрудничеству!',
          'Спустя год Вы становитесь нашим особым клиентом с индивидуальными скидками'
        ]
      }
    }
  },
  components: {
    AppTitle
  }
}
</script>

<style lang="stylus">
.become
  min-height 100vh
  display flex
  align-items stretch
  flex-direction column
  .el-col
    float none
    flex: 1 1 auto
    display flex
    align-items stretch
    flex-direction column

.wrap-name
  display flex
  justify-content center
  align-items center

.el-tabs
  display flex
  align-items stretch
  flex-direction column
  flex 1 1 auto
  &__nav
    &-scroll
      display flex
    &-wrap::after
      background #373737
  &__item
    font 16px h
    text-transform uppercase
    height 40px
    display flex
    justify-content center
    align-items center
    padding 0
    transition background ease .2s
    &.is-active
      background #373737
      transition background ease .5s
    &:nth-child(2)
      border-radius 0 10px 0 0
    &:last-child
      border-radius 10px 0 0 0
  &__header
    margin 0px
  &__content
    flex 1 1 auto
    display flex
    align-items stretch
    .el-tab-pane
      flex 1 1 auto
      border-top 2px solid #dcbc96

  .label
    text-transform uppercase
    font-size 18px
    font-family h!important
    @media (max-width 600px)
      font-size 14px
    @media (max-width 400px)
      font-size 12px
    &:before
      padding-right 10px
      font 17px h
      @media (max-width 600px)
        padding-right 5px
        font-size 12px
      @media (max-width 400px)
        padding-right 3px
        font-size 10px
  .wrap-tab-content
    background #373737
    display flex
    justify-content center
    align-items center
    .tab-content
      height 100%
      display flex
      flex: 1 1 auto
      flex-wrap wrap
      justify-content center
      align-items center
      padding 100px 0 0 0
      max-width 1400px
      opacity 0
      &.mobi-tab-content
        opacity 1

  .block-items
    display flex
    align-items center
    position relative
    .item-arrow
      color #429ce3
      font-size 50px
      position absolute
      right -25px
      // &:nth-child(1)
    @media (min-width 1140px)
      &:nth-child(3),
      &:nth-child(6)
        .item-arrow
          opacity 0
    @media (min-width 760px) and (max-width 1139px)
      &:nth-child(2),
      &:nth-child(4),
      &:nth-child(6)
        .item-arrow
          opacity 0
    @media (max-width 759px)
      .item-arrow
        bottom calc(-50% - 20px)
        right 0
        left 0
        transform rotate(90deg)
  .item-wrap
    display flex
    justify-content baseline
    align-items center
    flex-direction column
    padding 20px 50px
    margin-bottom 50px
    height 210px
    .item-circle
      width 100px
      height 100px
      display flex
      justify-content center
      align-items center
      border 2px solid #429ce3
      font bold 50px h
      color #429ce3
      border-radius 50%
      box-shadow 2px 2px 2px rgba(0,0,0,.5)
    .item-text
      padding-top 10px
      color #fffdec
      max-width 280px
      text-align center
      font-size 14px
      line-height 20px



</style>
