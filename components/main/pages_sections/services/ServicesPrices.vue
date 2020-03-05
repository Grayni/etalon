<template lang="pug">
  el-row.table-wrap
    el-col.table-buh(:span="24")
      h2 Цены на бухгалтерские услуги

      el-table(
        :data="tableData"
        style="width: 100%; max-width: 1100px"
      )
        el-table-column(
          prop="name-service"
          label="Название опции / услуги"
          min-width="200"
        )
        el-table-column(
          prop="minimum"
          label="Minimum"
          width="120"
        )
        el-table-column(
          prop="lite"
          label="Lite"
          width="120"
        )
        el-table-column(
          prop="optimal"
          label="Optimal"
          width="120"
        )
        el-table-column(
          prop="maximum"
          label="Maximum"
          width="120"
        )

</template>
<script>
export default {
  methods: {
    handleClick() {
      console.log('click');
    }
  },
  data() {
    return {
      tableData: [{
        'name-service': 'Выполнение регламентных операций, формирование регистров налогового и бухгалтерского учета',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Отражение в 1С первичных документов, полученных от поставщиков и подрядчиков',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Отражение в 1С «сложных» операций (лизинг, приобретение и выбытие ОС, НМА и т.п.)',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Контроль оформления первичных документов',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Контроль ввода первичных документов в 1С работниками Заказчика',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Подготовка первичных документов для клиентов Заказчика',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Формирование отчета о состоянии дебиторской и кредиторской задолженности',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Оформление авансовых отчетов',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Сверка дебиторской/кредиторской задолженности с контрагентами Заказчика , в т.ч. запрос и получение от контрагента Заказчика пакета документов',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Направление документов по ЭДО (при оплате тарифа ЭДО) контрагентам Заказчика',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Заполнение таблиц, спец форм по формам Заказчика',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Расчет налогов, сборов и взносов, подлежащих уплате в бюджет Заказчиком',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Подготовка налоговой и бухгалтерской отчетности, отправка ее по ТКС (ИФНС, ПФР, ФСС, Росстат)',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }, {
        'name-service': 'Подготовка ответов на требования, сообщения, уведомления и т.д. налогового органа (камеральные и встречные проверки). Подача заявлений, уведомлений в налоговый орган по ЭДО',
        minimum: '–',
        lite: '–',
        optimal: '+',
        maximum: '+'
      }]
    }
  }
}
</script>

<style lang="stylus">
.table-wrap
  padding 100px 0
.el-table
  font-size 15px
  left 50%
  transform translateX(-50%)
  .cell
    word-break normal
    text-align center
  tr
    td
      &:first-child
        .cell
          text-align left
          font-weight bold
  th
    .cell
      text-transform uppercase
  .main-col
    text-align left
</style>