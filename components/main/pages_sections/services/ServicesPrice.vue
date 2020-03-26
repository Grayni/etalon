<template lang="pug">
  .price-wrap
    h2 Таблица расчета по тарифу
    .wrap-wrap-rate
      .wraper-rate
        h3 Ценообразование тарифов:
        el-select(v-model="value" placeholder="Выбрать тариф" @change="selectRate")
          el-option(
            v-for="table in tables"
            :key="table.name"
            :label="capital(table.name)"
            :value="table.name"
          )

    .table-block-wrap
      el-table.table-block(
        header-cell-class-name="cell-cell"
        :data="dataTable.rows"
      )

        el-table-column(
          label="Количество"
          width="auto"
          min-width="200"
        )
          template(slot-scope="{row: {operations}}")
            span.data-cell {{operations}}

        el-table-column(
          label="УСН 6%"
          width="150"
          type="usn_6"
        )
          template(slot-scope="{row: {usn_6}}")
            span.data-cell {{usn_6}}

        el-table-column(
          label="УСН 7%"
          width="150"
          type="usn_7"
        )
          template(slot-scope="{row: {usn_7}}")
            span.data-cell {{usn_7}}

        el-table-column(
          prop="osn"
          label="ОСН"
          width="150"
          type="osn"
        )
          template(slot-scope="{row: {osn}}")
            span.data-cell {{osn}}

        el-table-column(
          prop="usn_6"
          label="ЕНВД"
          width="200"
          type="envd"
        )
          template(slot-scope="{row: {usn_6}}")
            span.data-cell {{usn_6}}
</template>

<script>
import {capital} from '@/plugins/mixins'
export default {
  mixins: [capital],
  props: {
    tables: {
      type: Array
    }
  },
  data() {
    return {
      value: 'optimal',
      dataTable: null
    }
  },
  methods: {
    selectRate() {
      this.dataTable = this.tables.filter(x => x.name === this.value)[0]
    }
  },
  created() {
    this.selectRate()
    this.value = this.tables[0].name
  }
}
</script>

<style lang="stylus" scoped>
.table-block
  max-width 1000px
  padding 20px
  margin 20px 0 60px
  &-wrap
    max-width 100%
    display flex
    justify-content center
    flex-direction column
  .cell-cell .cell
    display flex
    justify-content flex-start
    text-align start
.wrap-wrap-rate
  display flex
  justify-content center
  align-items center
  flex-direction column
  margin 20px 0
  .wraper-rate
    display flex
    justify-content center
    align-items center
    flex-direction column
</style>
