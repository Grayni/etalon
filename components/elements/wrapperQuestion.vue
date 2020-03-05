<template lang="pug">
  el-container.questions
    el-aside(width="400px")
      .container-menu
        h3 Вопросы
        .fog-box.top
        el-menu(
          router
          :default-active="$route.path"
        )
          el-submenu(
            v-for="(group, id) of groups"
            :index="String(id)"
            :key="id+_uid"
          )
            template( slot="title")
              span.group-title {{group.name}}
            el-menu-item(
              v-for="(question, idx) of group.questions"
              :key="id+idx+2+_uid"
              :index="'/questions/'+translit(question)"
              @click="openItem(question)"
              ) {{question}}
        .fog-box.bottom

    el-container
      el-header
        h3 {{this.header}}
      el-main
        slot
    //- :index="'/'+translit(question)"
    //- :index="String(`${id+1}-${idx+1}`)"
</template>

<script>
import {transliter} from '@/plugins/mixins'
export default {
  mixins: [transliter],
  data() {
    return {
      header: 'Часто задаваемые вопросы',
      chpu: '',
      groups: [
        {
          name: 'О компании',
          questions: [
            'В какой организационной форме образована компания? Зарегистрирован ли центр в ЕГРЮЛ?',
            'Какие виды деятельности осуществляет центр бухгалтерского обслуживания «Эталон»?',
            'На какой территории ведется деятельность? Кто может стать вашим клиентом?'

          ]
        },
        {
          name: 'О сотрудничестве',
          questions: [
            'Где работают специалисты? Что делать, если у клиента нет подходящего помещения?',
            'Как организуется хранение документов? Будет ли у компании-клиента архив?',
            'Как обеспечивается конфиденциальность? Какие гарантии у клиента?',
            'Как происходит обмен документами? Что, если справка требуется срочно?'
          ]
        },
        {
          name: 'О ценах и порядке оплаты',
          questions: [
            'Как рассчитывается стоимость обслуживания в центре? От чего зависят цены?',
            'Как организуются расчеты? Принимаете ли вы оплату наличными деньгами?',
            'Как проверить, все ли предъявленные к оплате услуги оказаны?',
            'Есть ли у вас льготные программы обслуживания? Какие бонусы получают постоянные клиенты?',
            'В какие сроки производится оплата? Есть ли у вас система отсрочек?',
            'Как часто меняются тарифы? Что если счет окажется выше, чем мы запланировали?'
          ]
        },
        {
          name: 'Об ответственности',
          questions: [
            'Кто несет ответственность за ошибки в отчетах и несвоевременность сдачи деклараций?',
            'Что подразумевается под формулировкой «форс-мажор» в договоре об обслуживании?',
            'Как часто возникают споры между клиентами и центром? В каком порядке проводится урегулирование?'
          ]
        },
        // {
        //   name: 'О тарифах',
        //   questions: []
        // },
        // {name: 'Про налоговую оптимизацию'},
        // {name: 'Про кадры'},
        // {name: 'О восстановлении учета'},
        // {name: 'Про финансовые консультации'},
        // {name: 'О регистрации организации(ип)'},
        // {name: 'О "нулевке"'},
        // {name: 'О задолженностях'}
      ]
    }
  },
  methods: {
    // selectMenuItem(key, keyPath) {
    //   this.header = this.groups[+keyPath[0]].questions[this.indexItem]
    // },
    openItem(quest) {
      this.header = quest
      this.chpu = this.translit(quest)
      this.$router.push(`/questions/${this.chpu}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.questions
  padding 170px 0 20px 0
  min-height 100%
  @media (max-width 790px)
    padding-top 80px
.el
  &-aside
    display flex
    justify-content center
    align-items flex-start
  &-menu
    overflow-y auto
    overflow-x hidden
    height calc(80vh - 170px)
    max-width 280px
    min-width 280px
    padding 30px 0
    position relative
    &-item
      white-space normal
      height auto
      line-height 22px
      padding 20px
      font-size 14px
  &-header
    color #252525
    border-bottom solid 1px #e6e6e6
    display flex
    justify-content flex-end
    h3
      font-size 16px
      padding-right 10vw
      text-transform none
.container-menu
  position fixed
.fog-box
  height 60px
  pointer-events none
  position absolute
  width 100%
  z-index 2222
  &.top
    top 64px
    background linear-gradient(0deg, rgba(255,253,236,0) 0%, rgba(255,253,236,1) 100%)
  &.bottom
    bottom 0
    background linear-gradient(180deg, rgba(255,253,236,0) 0%, rgba(255,253,236,1) 100%)

.group-title
  font bold 14px h
  margin-right 22px
</style>
