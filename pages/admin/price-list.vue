<template lang="pug">
  .price-list
    h3 Прайс-лист
    app-date-change(:date-last="new Date().toLocaleString()")

    el-select(
      v-model="prices.names"
      placeholder="Выбрать таблицу"
      :visible-change="changeTable(prices.name)"
      :remote="true"
    )
      el-option(
        v-for="option in options"
        :key="option"
        :label="option"
        :value="option"
      )

    input.input-cell(
      ref="input-el"
      v-model="cellChangeInput"
      @blur="applyChange"
      v-show="showInput"
      @keyup.13="applyChange"
    )
    el-table(
      :data="prices.table"
      @cell-click="addBorder"
      @cell-dblclick="editCell"
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
      )
        template(slot-scope="{row: {usn_6}}")
          span.data-cell {{usn_6}}

      el-table-column(
        label="УСН 7%"
        width="150"
      )
        template(slot-scope="{row:{usn_7}}")
          span.data-cell {{usn_7}}

      el-table-column(
        prop="osn"
        label="ОСН"
        width="150"
      )
        template(slot-scope="{row:{osn}}")
          span.data-cell {{osn}}

      el-table-column(
        prop="usn_6"
        label="ЕНВД"
        width="150"
      )
        template(slot-scope="{row:{usn_6}}")
          span.data-cell {{usn_6}}

</template>

<script>
import AppDateChange from '@/components/admin/DateChange'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Цены | ${process.env.appName}`
  },
  components: {
    AppDateChange
  },
  async asyncData({store}) {
    const prices = await store.dispatch('tables/fetchAdmin')
    return {prices}
  },
  data() {
    return {
      borderData: '',
      showInput: false,
      borderInfo: {
        name: '',
        tabel: ''
      },
      dataElem: '',
      cellChangeInput: '',
      options: [ 'minimum', 'lite', 'optimal', 'maximum' ],
      value: ''
    }
  },
  methods: {
    addBorder(row, column, cell, event) {
      if (this.borderData) {
        this.borderData.classList.remove('border-show')
      }
      this.borderData = cell
      this.borderData.classList.add('border-show')
    },
    editCell(row, column, cell, event) {
      if (event.target.parentNode.classList[0] === 'cell') {
        console.log(event)
        // this.cellChangeInput = event.toElement.innerText
        this.cellChangeInput = event.originalTarget.innerText
        this.showInput = true
        this.dataElem = event.originalTarget
        event.target.parentNode.appendChild(this.$refs['input-el'])
        if (this.$refs['input-el'].style.display = 'block') {
          this.$refs['input-el'].focus()
        }
      }
    },
    applyChange() {
      this.showInput = false
      this.dataElem.innerHTML = this.cellChangeInput
    },
    changeTable(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="stylus">
.price-list
  width 100%
  display flex
  justify-content center
  flex-direction column
  align-items center
  .data-cell
    // border none
  .el-table
    max-width 1200px
    &--enable-row-hover
      .el-table__body tr
        &:hover
          &>td
            background none
            color inherit
        td
          position relative
          padding 0
          cursor pointer
          border none
          &:hover
            background rgba(220,188,150,.2)
  .cell
    height 100%
    min-height 48px
    display flex
    align-items center
    flex-direction column
    .data-cell
      width 100%
      height 100%
      flex 1 1 auto
      display flex
      align-items center
      &::selection
        background transparent
  .input-cell
    height 100%
    width 100%
    position absolute
    left 0
    top 0
    padding 0 10px
    outline none
    border none!important
  .border-show
    outline 1px solid #429ce3!important

  .el-table, .el-table tr, .el-table__body-wrapper
    overflow visible!important
  .el-option
    padding 20px 0
</style>
