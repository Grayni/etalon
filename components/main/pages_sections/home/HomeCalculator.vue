<template lang="pug">
  .computer
    .wrap-name
      app-title Расчет стоимости
    el-row
      el-col.left-calc(:lg="18" :span="24")
        el-row.calculator
          el-col.gird-content(:span="24")
            .calc-wrap
              .calc
                .wrap-sld
                  h3.name-value Система налогообложения
                  el-slider.system(
                    v-model="sliders.system.def"
                    :max="3"
                    :format-tooltip="changeSystemName"
                    :marks="sliders.system.data"
                    ref="systemBlock"
                    @change="changeSlider($event, 'system', sliders.system.memory)"
                    :placement="'left'"
                    @input="showSystem(sliders.system.data[$event])"
                  )
                .wrap-sld
                  h3.name-value Количество операций
                  el-slider.operations(
                    v-model="sliders.operations.def"
                    input-size="large"
                    :marks="sliders.operations.data"
                    :max="12"
                    :format-tooltip="changeOperationsName"
                    @change="changeSlider($event, 'operations', sliders.operations.memory)"
                    @input="showOperation($event)"
                  )
                .container-humans
                  transition(name="fade-humans")
                    .wrap-sld-humans(v-if="!staff")
                      h3.name-value Количество сотрудников
                      .wrap-input-number
                        el-input-number(
                          v-model="sliders.humans.def"
                          @change="changeHumans($event)"
                          @input="showHuman($event)"
                          size="large"
                          :min="0"
                          :max="100"
                        )
                      el-slider.humans(
                        v-model="sliders.humans.def"
                        :marks="sliders.humans.data"
                        :max="100"
                        @change="changeHumans($event)"
                      )
                .wrap-sld
                  h3.name-value Дополнительные условия
                  .wrap-conditions
                    .condition(v-for="(switcher, id) in switches" :key="`${_uid}_${id}`")
                      el-switch(v-model="switcher.switch" @change="sw1(switcher.switch, id, switcher.percent)")
                      p {{switcher.name}}

      el-col.right-calc(:lg="6" :span="24")
        el-row.calculator
          el-col.gird-content(:span="24")
            .rate-wrap
              el-row.rate
                el-col.rate-col.left(:xs="24" :lg="24" :span="12")
                  h2 Выбор тарифа
                  .wrap-link
                    nuxt-link(to="/services")
                      .link
                        i.el-icon-warning-outline
                        span Отличия тарифов
                  .container-rates
                    el-slider.rates(
                      v-model="sliders.rates.def"
                      vertical
                      height="200px"
                      :marks="sliders.rates.data"
                      :min="0"
                      :max="Object.keys(this.sliders.rates.data).length-1"
                      :format-tooltip="changeRatesName"
                      @change="changeSlider($event, 'rates', sliders.system)"
                      @input="showRate($event, sliders.rates.data)"
                    )
                  .condition.staff
                    el-switch(v-model="staff" @change="changeStaff")
                    p Вы = ИП без сотрудников
                el-col.rate-col.right(:xs="24" :lg="24" :span="12")
                  .container-cost
                    p Месячное обслуживание
                    .wrap-name
                      .container-name.cost
                        .glass
                        .computer-name
                          .wrap-cost
                            span.num {{result}}
                            span.sign ₽
                          span.condition(v-if="!positions.operations && !positions.humans") в квартал
                          span.condition(v-else) в месяц
                  .wrap-button
                    el-button.call(type="info" plain @click="showBackForm")
                      |Обсудить
                      span.asterisk *
                  .wrap-footnote
                    p Узнать подробнее о цене и альтернативных предложениях. Бесплатный расчет от бухгалтера для выбора более выгодной системы налогообложения.

</template>
<script>
import {Slider} from '@/classes/slider'
import AppTitle from '@/components/slots/Title'
import {capital} from '@/plugins/mixins'

export default {
  mixins: [capital],
  components: {
    AppTitle
  },
  props: {
    calculates: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      server: {
        obj: {},
        row: {},
        cost: 0,
        perc: 1
      },
      humansCost: 0,
      positions: {
        operations: 0,
        humans: 0,
        system: 'usn_6',
        rate: 'optimal'
      },
      serverDestributor: {
        rates: {},
        operations: {}
      },
      staff: false,
      switches: [
        {switch: false, name: 'Совмещение различных систем налогообложения', percent: .25, value: 0},
        {switch: false, name: 'Ведение раздельного учета при применении разных ставок НДС', percent: .25, value: 0},
        {switch: false, name: 'Осуществление внешнеэкономической деятельности', percent: .4, value: 0},
        {switch: false, name: 'Наличие повременной оплаты труда', percent: .1, value: 0},
        {switch: false, name: 'Наличие курсовой разницы', percent: .1, value: 0},
        {switch: false, name: 'Наличие недвижимости', percent: .1, value: 0},
        {switch: false, name: 'Наличие обособленных подразделений', percent: .2, value: 0},
        {switch: false, name: 'Алкогольная декларация', percent: .25, value: 0},
        {switch: false, name: 'Наличие контрольно-кассовой техники', percent: .2, value: 0}
      ],
      coefficient: 1,
      sliders: {
        system: new Slider({
          0: 'УСН Доходы',
          1: 'УСН Доходы - Расходы',
          2: 'ОСН',
          3: 'ЕНВД'
        }, 0),
        operations: {},
        humans: new Slider({
          0: '0',
          10: '10',
          20: '20',
          30: '30',
          40: '40',
          50: '50',
          60: '60',
          70: '70',
          80: '80',
          90: '90',
          100: '100'
        }),
        rates: {}
      },
      reserve: 0,
      degree: 1,
      sendMail: {
        type: 'Калькулятор',
        organization: '',
        rate: '',
        system: '',
        operations: '',
        humans: '',
        switchers: [],
        cost: 0
      }
    }
  },
  computed: {
    result () {
      let switchResult = this.switches.reduce((a,b) => a+b.value, 0)
      let res = Math.round(
        Math.pow((this.server.perc + switchResult), this.degree) * (+this.server.cost) + this.humansCost*this.degree
      ) + ''
      return res + ''
    }
  },
  methods: {
    showBackForm() {
      let switchBox = this.switches.filter(x => x.switch).map(x => x.name)
      this.sendMail.organization = this.staff ? 'ИП без сотрудников' : 'Организация или ИП с сотрудниками (не точно)'
      this.sendMail = {
        type: this.sendMail.type,
        organization: this.sendMail.organization,
        rate: this.positions.rate,
        system: this.sendMail.system,
        operations : this.server.row.operations,
        humans: this.positions.humans,
        switches: switchBox,
        cost: this.result
      }

      this.$store.commit('showChange')
      this.$store.commit('sendings/dataMail', this.sendMail)
    },
    sw1(status, i, per) {
      this.switches[i].value = status ? per : 0
    },
    changeStaff() {
      if (this.staff) {
        this.reserve= this.humansCost
        this.humansCost = 0
      } else {
        this.humansCost = this.reserve
      }
    },
    findCost() {
       // 1. define RATE obj
      this.server.obj = this.calculates.filter(x => x.name === this.positions.rate)[0]

      // 2. find value operations
      this.server.row = this.server.obj.rows[this.positions.operations]

      // 3. find system and cost system
      if (!this.positions.operations) {
        this.server.cost = (this.server.row[this.positions.system]).match(/\d+/)[0]
      } else {
        this.server.cost = +this.server.row[this.positions.system]
      }
    },
    showSystem(value) {
      this.positions.system =
        value === 'УСН Доходы' || value === 'ЕНВД' ? 'usn_6':
        value === 'УСН Доходы - Расходы' ? 'usn_7' :
        value === 'ОСН' ? 'osn' : ''

      this.sendMail.system = value
    },
    showOperation(value) {
      this.positions.operations = value
    },
    showHuman(value) {
      this.positions.humans = value
    },
    showRate(order, obj) {
      this.positions.rate = obj[order].toLowerCase()
    },
    changeSystemName(val) {
      return this.sliders.system.data[val]
    },
    changeOperationsName(val) {
      if (val>0) {
        this.degree = 1
        return 'до ' + this.sliders.operations.data[val]
      } else {
        this.degree = 0
      }
      
    },
    changeRatesName(val) {
      let name = this.sliders.rates.data[val]
      if (name) {
        switch(name.toLowerCase()) {
          case 'minimum': 
            return `Все входящие и исходящие документы заносятся\n клиентом самостоятельно в программу 1С`
          case 'lite':
            return `Исходящие документы готовятся\n клиентом самостоятельно`
            break
          case 'optimal':
            return `Работа в режиме "online"`
            break
          case 'maximum':
            return `Работа в режиме "online"\n + ведение банк-клиента`
            break
          default:
            return 'Что-то не так'
        }
      }
    },
    changeSlider(e, dom, vueElement) {
      vueElement = document.querySelectorAll(`.${dom} .el-slider__marks-text`)

      for (let key in vueElement) {
        if (vueElement[key].style) vueElement[key].style.color = '#429ce3'
      }
      vueElement[e].style.color = '#dcbc96'
      this.findCost()
    },
    changeHumans(e) {
      this.sliders.humans.memory = document.querySelectorAll('.humans .el-slider__marks-text')

      for (const key in this.sliders.humans.memory) {
        if (+key >= 0) this.sliders.humans.memory[key].style.color = '#429ce3'
      }

      if (this.sliders.humans.memory[e/10]) {
        this.sliders.humans.memory[e/10].style.color = '#dcbc96'
      }
      
      this.humansCost = (e > 3) ? 300*(e-3) : 0
    }
  },
  mounted() {
    const saveDom = dom => document.querySelectorAll(`.${dom} .el-slider__marks-text`)

    for (const slider in this.sliders) {
      const positionRegulator = this.sliders[slider].def
      saveDom(slider)[positionRegulator].style.color = '#dcbc96'
    }
  },
  created() {
    // rates
    for (let i=0; i<this.calculates.length; i++) {
      if (this.calculates[i].present) {
        this.serverDestributor
          .rates[Object.keys(this.serverDestributor.rates).length] = this.capital(this.calculates[i].name)
      }
    }
    this.sliders.rates = new Slider(this.serverDestributor.rates, 0)
    
    // operations
    for (let i=0; i<this.calculates[0].rows.length-1; i++) {
        if (!i) {
          this.serverDestributor.operations[i] = '0'
        } else {
          this.serverDestributor.operations[i] = (this.calculates[0].rows[i+1].operations).match(/\d+/)[0] - 1 + ''

          if (this.serverDestributor.operations[i] > 250) {
            this.serverDestributor.operations[i] = +this.serverDestributor.operations[i] + 1 + ''
          }
        }
    }

    this.sliders.operations = new Slider(this.serverDestributor.operations, 0)

    this.findCost()
  }
}
</script>

<style lang="stylus">
.computer
  .wrap-name
    display flex
    justify-content center
    align-items center
    .container-name
      padding 2px
      border 4px solid #429CE3
      margin 10vh 0
      transform rotate(-2deg)
      background rgba(66,156,227,.06)
      position relative
      .glass
        position absolute
        width 100%
        height 100%
        left 0
        top 0
        pointer-events none
        box-shadow inset -10px 10px 20px rgba(255,253,236, .5), inset 10px -10px 10px rgba(255,253,236, .5)
    .computer-name
      margin 0
      color #429CE3
      padding 5px
      border 1px solid #429CE3
      font-weight bold
      box-shadow 0 0 13px rgba(255,253,236, 1), 0 10px 13px rgba(255,253,236, .5), 15px 5px 31px rgba(255,253,236, 1)
      display flex
      justify-content center
      text-align center
      align-items center
      flex-direction column

  .calculator
    padding 0 0 15vh 0
    transform scale(.95)
    opacity 0
    @media (max-width 1199px)
      padding-bottom 10px
    .gird-content
      display flex
      justify-content center
      align-items center
      flex-direction column
    h2
      margin 0 0 60px 0
    h3
      text-transform uppercase
      font normal 20px h
      @media (max-width 510px)
        font-size 18px
  .name-value
    color #b8b8b8
  .calc, .rate
    background #252525
    border-radius 4px
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    &-wrap
      display block
      width 100%
  .calc
    padding 50px 60px 80px 60px
    @media (max-width 970px)
      overflow hidden
      padding 50px 30px 80px 30px
    &-wrap
      padding 0 10px 0 40px
      @media (max-width 1199px)
        padding-left 10px

  .wrap-link
    display flex
    justify-content center
    align-items center
    margin-top 10px
    &:hover
      a, i
        transition color 0.3s ease-in
        color #e4e7ed
    a
      text-decoration none
      text-transform lowercase
      font 14px h
      color #429ce3
      transition color 0.3s ease-in

  .link
    display flex
    justify-content center
    align-items center
    i
      color #429ce3
      margin-right 4px
      font-size 12px
      transition color 0.3s ease-in
    span
      display block
      justify-content center
      align-items center
      height 14px
      line-height 12px

  .rates
    margin-top 70px
    padding-left 30px
    @media (max-width 1199px)
      display flex
      justify-content center
      padding 0 calc(50% - 100px) 0 0
    @media (max-width 760px)
      justify-content flex-start
      padding 0 0 0 30px
  .rate
    padding 30px 30px 40px 30px
    @media (max-width 1199px) and (min-width 768px)
      display flex
      padding 30px 0 40px 0
      &-col
        padding 0 10px
        &.right
          border-left 2px dashed #fffdec
          flex 1 1 auto
          display flex
          justify-content center
          align-items center
          flex-direction column
        
    .container-rates
      border-bottom 1px solid #429ce3
      padding-bottom 50px
    &-wrap
      padding 0 40px 0 10px
      @media (max-width 1199px)
        padding-right 10px
    h2
      color #b8b8b8
      font 20px h
      margin 40px 0 0 0
  .el-slider
    &__bar
      background rgb(220, 188, 150)
    &__marks-stop
      background #252525
      border-radius 0
    &.system
      .el-slider
        &__bar
          background transparent
      .el-slider__marks-text
        &:first-child
          left 20px!important
          &:before
            right 20px
            position relative
    &__button
      height 30px
      width 15px
      background #252525
      border 0px solid transparent
      border-radius 10px 10px 100% 100%
      box-shadow inset 0 15px 10px rgba(255,255,255, .9), 0 5px 7px rgba(0,0,0, .3)
    &__marks-text
      transition color 0.3s ease-in
      font 14px h
      top 8px
      
      .rates &
        top auto
        font-size 20px
        display flex
        justify-content center
        align-items center
      .operations &
        font bold 10px h
        transform rotate(45deg)
        min-width 40px
      &:hover
        color #E4E7ED!important
        transition color 0.3s ease
        &:before
          color: #E4E7ED
          transition color ease 0.3s
      &:before
        content: '-'
        font-size 30px
        line-height 10px
        padding-bottom 3px
        display flex
        align-items center
        justify-content center
        transform rotate(90deg)
        .operations &
          content: ' - '
          display inline-block
          position relative
          top 1px
          left -5px
          font-size 14px
          line-height 30px
          transform rotate(0) scale(1)
        .rates &
          content: '-'
          margin 0 10px
          transform rotate(0)

  .el-tooltip__popper
    &.is-dark
      color #b8b8b8
      font bold 14px h
      background #373737
      box-shadow 0 -1px 2px rgba(255,255,255,.2)
      white-space pre-line
    &[x-placement^=top] .popper__arrow
      border-top-color #373737
      &::after
        border 5px solid transparent
        border-top-color transparent
    &[x-placement^=bottom] .popper__arrow
      border-bottom-color #373737
      &::after
        border 5px solid transparent
        border-bottom-color transparent
  .wrap-input-number
    display flex
    justify-content center
    align-items center
    .el-input
      &-number
        &__decrease,
        &__increase
          border-color transparent
      &__inner
        border-color #373737
        border-radius 5px
        background #373737

  .el-switch__core
    border 2px solid #252525!important
    height 21px
    &:after
      box-shadow inset 0 12px 7px rgba(255,255,255, .9), 0 5px 7px rgba(0,0,0, .2)
      background #252525
    .el-switch.is-checked &
      background #373737
  .el-slider__bar
    background #373737
  .wrap-conditions
    display grid
    grid-template-columns 2fr 2fr
    grid-auto-rows 40px
    @media (max-width 890px)
      grid-template-columns 1fr
  .condition
    display flex
    justify-content flex-start
    align-items center
    &.staff
      justify-content center
      border-bottom 1px solid #429ce3
      padding 20px 0
    p
      color #E4E7ED
      font 14px h
      padding-left 7px
      @media (max-width 510px)
        font-size 12px

  .container-humans
    @media (max-width 1199px)
      height 170px

  .wrap-sld
    min-height 170px
    &-humans
      min-height 170px
      max-height 270px
      opacity 1
      h3
        margin-top 0

  .container-cost
    display flex
    justify-content center
    align-items center
    flex-direction column
    padding 40px 0 20px 0
    p
      font 16px h
      text-transform uppercase
      color #b8b8b8

    .cost
      margin 40px 0 0 0
      display flex
      justify-content center
      .glass
        box-shadow inset -10px 10px 30px rgba(37,37,37, .8), inset 10px -10px 10px rgba(37,37,37, .8), inset 0 20px 40px rgba(37,37,37, .8), inset 55px -55px 11px rgba(37,37,37, 0.3)
      .computer-name
        display flex
        padding 5px 20px
        box-shadow 0 0 23px rgba(37,37,37, 1), 0 10px 13px rgba(37,37,37, .5), 15px 5px 31px rgba(37,37,37, 1), 15px 15px 31px rgba(37,37,37, .8)
      span
        font 50px h
        // color rgb(220, 188, 150)
        &.sign
          font bold 35px h
          margin-left 10px
          // text-shadow 0 0 2px rgba(66,156,227,.5)
          // color #373737
      .condition
        font-size 20px
  .wrap-button
    margin-top 30px
    position relative
    display flex
    justify-content center
    align-items center
    .call
      font bold 20px h
      background #dcbc96
      color #252525
      border none
      .asterisk
        color #F56C6C
      &:hover
        box-shadow 0 0 7px rgba(255,253,236, .4)
  .wrap-footnote
    display flex
    justify-content center
    align-items center
    color #b8b8b8
    font 12px h
    padding 20px 0 0 0
    @media (max-width 1199px)
      margin-left 10px
    p:before
      content '*'
      display block
      position relative
      bottom - 12px
      left -10px
      font 12px h
      color #F56C6C
    span
      color #F56C6C

  .fade-humans
    &-enter-active
      transition max-height .5s ease, opacity .5s ease, min-height .3s ease
    &-leave-active
      transition opacity .2s ease, max-height .3s ease, min-height .5s ease

    &-enter,
    &-leave-to
      min-height 0
      max-height 0
      opacity 0

  .right-calc
    .el-slider__marks-text
      display flex
      align-items center
      justify-content center
      align-items center
      &:last-child
        align-items flex-end
      &:before
        transform rotate(0deg)
        margin-right 4px
</style>
