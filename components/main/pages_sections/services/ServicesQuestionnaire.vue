<template lang="pug">
  el-row.questionnaire
    el-col.present(:span="24")
      h2 Предварительный расчет ведения учета
      p Заполните анкету и узнайте стоимость услуг
      // Заполнение анкеты -> с отправкой на почту.
      el-button.calculate(type="success" @click="renderCard") Расчитать стоимость

    transition(name="fade")
      el-col.fly-box(:span="24" v-if="activeCard")
        el-card.box-card(v-for="(card, id) in cardArray" :key="id+_uid" v-show="card.status")
          .clearfix(slot="header")


            .wrap-header-card
              span.number-page {{id+1}}/{{cardArray.length}}
              span(v-if="id != cardArray.length-1") Заполните анкету и получите консультацию по стоимости услуг
              span(v-else) Для получения расчета введите Ваш E-mail
              span.cross(@click="renderCard")


          .content-block
            .line-container
              .line(:style="{width: (id)/(cardArray.length-1)*100+'%'}")

            div(:is="card.content" :information="card.data" @clicker="renderCard")


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
      let obj = {
        type: 'Анкета',
        page_1: [],
        page_2: 'Индивидуальный предприниматель (ИП)',
        page_3: [],
        page_4: 0,
        page_5: 0,
        page_6: 0
      }
      this.$store.commit('sendings/dataQuestionnaire', obj)
      this.$store.commit('sendings/dataMail', null)
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
          if (i === 0) {
            let val = this.$store.state.sendings.questionnaire.page_1

            if (val.length === 0) {
              this.$message.error('Необходимо выбрать хотя бы один вид деятельности')
              break
            }
          } else if (i === 2) {
            let val = this.$store.state.sendings.questionnaire.page_3

            if (val.length === 0) {
              this.$message.error('Необходимо выбрать хотя бы одну систему налогообложения')
              break
            }
          } else if (i === 5) {
            let fullDataCompany = this.$store.state.sendings.questionnaire
            this.$store.commit('sendings/dataMail', fullDataCompany)
          }
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

  .el-card__header
    border none

  .wrap-header-card
    justify-content space-between
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

</style>
