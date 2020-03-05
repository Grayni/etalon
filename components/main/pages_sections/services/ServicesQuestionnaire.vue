<template lang="pug">
  el-row.questionnaire
    el-col.present(:span="24")
      h2 Предварительный расчет ведения учета
      p Заполните анкету и узнайте стоимость
      // Заполнение анкеты -> с отправкой на почту.
      el-button.calculate(type="success" @click="renderCard") Расчитать стоимость

    transition(name="fade")
      el-col.fly-box(:span="24" v-if="activeCard")
        el-card.box-card(v-for="(card, id) in cardArray" :key="id+uid" v-if="card.status")
          .clearfix(slot="header")


            .wrap-header-card
              span.number-page {{id+1}}/{{cardArray.length}}
              span(v-if="id != cardArray.length-1") Заполните анкету и получите консультацию по стоимости услуг
              span(v-else) Для получения расчета введите Ваш E-mail
              span.cross(@click="renderCard")


          .content-block
            .line-container
              .line(:style="{width: (id)/(cardArray.length-1)*100+'%'}")

            div(:is="card.content" :information="card.data")


          .footer-block(:class="{'start': id === 0}")
            el-button(
              type="default"
              @click.prevent="cardStatusDown"
              v-show="id != 0"
            ) Назад
            el-button(
              type="success"
              @click.stop="cardStatusUp"
              v-show="id != cardArray.length-1"
            ) Дальше
</template>

<script>
import App1ViewDo from '~/components/elements/questionnaire/Checkboxes'
import App2IpOrganization from '~/components/elements/questionnaire/IpOrganization'
import App3System from '~/components/elements/questionnaire/Checkboxes'
import App4ValueOperations from '~/components/elements/questionnaire/Values'
import App5ValueServices from '~/components/elements/questionnaire/Values'
import App6ValueMachines from '~/components/elements/questionnaire/Values'
import App7SendForm from '~/components/elements/questionnaire/SendForm'
export default {
  components: {
    App1ViewDo,
    App2IpOrganization,
    App3System,
    App4ValueOperations,
    App5ValueServices,
    App6ValueMachines,
    App7SendForm
  },
  data() {
    return {
      activeCard: false,
      cardArray: [
        {
          content: App1ViewDo,
          status: true,
          data: {
            title: 'Выберите вид Вашей деятельности:',
            items: [
              'Оптовая торговля',
              'Розничная торговля',
              'Услуги',
              'Производство',
              'Общепит'
            ]
          },
        }, {
          content: App2IpOrganization,
          status: false
        }, {
          content: App3System,
          status: false,
          data: {
            title: 'Ваша система налогообложения:',
            items: [
              'Основная (НДС + Налог на прибыль)',
              'УСН 6% (Упрощенная система налогообложения 6% с оборота)',
              'УСН 7% (Упрощенная система налогообложения 7% с "Доходы - Расходы")',
              'ЕНВД (Единый налог на вмененный доход)',
              'ПСН (Патентная система налогообложения)'
            ]
          }

        }, {
          content: App4ValueOperations,
          status: false,
          data: {
            title: 'Количество операций/месяц:',
            subtitle: 'Количество продаж, поступлений и оплат по банку'
          }
        }, {
          content: App5ValueServices,
          status: false,
          data: {
            title: 'Количество сотрудников в штате:'
          },
        }, {
          content: App6ValueMachines,
          status: false,
          data: {
            title: 'Количество кассовых аппаратов:'
          },
        }, {
          content: App7SendForm,
          status: false
        }
      ]
    }
  },
  methods: {
    renderCard() {
      this.cardArray.map(x=>x.status = false)
      this.cardArray[0].status = true
      this.activeCard = !this.activeCard
    },
    cardStatusDown() {
      for (let i=0; i<this.cardArray.length; i++) {
        if (this.cardArray[i].status) {
          this.cardArray[i].status = false
          if (this.cardArray[i-1]) {
            this.cardArray[i-1].status = true
            break
          }
        }
      }
    },
    cardStatusUp(formName) {
      for (let i=0; i<this.cardArray.length; i++) {
        if (this.cardArray[i].status) {
          this.cardArray[i].status = false
          if (this.cardArray[i+1]) {
            this.cardArray[i+1].status = true
            break
          }
        }
      }
    },
  }
}
</script>

<style lang="stylus">
.questionnaire
  display flex
  justify-content stretch
  align-items stretch
  background-image url('/coffee.jpg')
  background-position 0 100%
  background-size 100% auto
  background-repeat no-repeat
  padding 20vh 0
  @media(max-width 900px)
    background-size cover
  .el
    &-col
      display flex
      justify-content center
      align-items center
      flex-direction column
      flex 1 1 auto
    &-button
      text-transform uppercase
      &.calculate
        margin-top 40px
    &-card
      display flex
      justify-content stretch
      &__body
        flex 1 0 auto
        display flex
        flex-direction column
        padding-top 0
  .present
    h2, p
      color #fffdec

.fly-box
  display flex
  justify-content center
  align-items center
  position fixed
  top 0
  left 0
  background-color rgba(0,0,0,.7)
  min-height 100vh
  min-width 100vw
  z-index 3
  .box-card
    background-color #373737
    border none
    box-shadow 2px 2px 7px rgba(0,0,0,.5)
    max-width 1024px
    max-height 700px
    width 90vw
    height 90vh
    min-height 300px
    min-width 320px
    display flex
    flex-direction column
    color #b8b8b8
.clearfix
  &:before,&:after
    display table
    content ""
  &:after
    clear both
.el-card__header
  border none

.cross
  width 20px
  height 20px
  background-color #F56C6C
  display block
  cursor pointer
  border-radius 5px
  &:before
    content '✕'
    font-size 19px
    display inline-block
    position relative
    color #fffdec
    top -4px
    right -2px
  &:hover
    background #EA6767
.wrap-header-card
  display flex
  justify-content space-between

.content-block
  flex 1 0 auto
  display flex
  align-items center
  flex-direction column
.footer-block
  width 100%
  flex 0 0 auto
  display flex
  justify-content space-between
  &.start
    justify-content flex-end

.fade
  &-enter-active
    transition opacity .5s ease
  &-leave-active
    transition opacity .3s ease

  &-enter,
  &-leave-to
    max-width 0
    opacity 0
.number-page
  font bold 12px h
  color #429ce3

.line-container
  width 100%
  height 4px
  background-color #aaa
  margin-bottom 20px
  .line
    height 100%
    background-color #429ce3
</style>
