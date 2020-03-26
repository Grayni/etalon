<template lang="pug">
  el-row.table-wrap
    el-col.table-buh(:span="24")
      h2 Цены на бухгалтерские услуги

      el-table(
        :data="rates"
        style="width: 100%; max-width: 1100px"
      )
        el-table-column(
          prop="title"
          label="Название опции / услуги"
          min-width="200"
        )
        el-table-column(
          width="100px"
          align="center"
          v-for="(activator, id) in rates[0].activators"
          :label="names[id]"
          :key="`activatora-${id}`"
        )
          template(slot-scope="{row: {activators}}")
            span.sign {{activators[id] | sign}}

        el-table-column(
          prop="price",
          label="Стоимость"
          width="150"
        )

</template>
<script>
export default {
  props: {
    rates: Array
  },
  data() {
    return {
      names: ['Minimum','Lite', 'Optimal', 'Maximum']
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
  .sign
    font 20px Tahoma
</style>