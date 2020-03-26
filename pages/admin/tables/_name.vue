<template lang="pug">
  .price-table
    app-breadcrumb(:way="data")
    .price-table-switcher
      h3 {{ data.title }}
      el-switch.switch(v-model="table.present" @change="showTable")
    
    .price-table-wrap
      app-date-change(:date-last="table.date")
      input.input-cell(ref="input-el" v-model="cellChangeInput" @blur="applyChange" v-show="showInput" @keyup.13="applyChange")

      el-table(
        :data="table.rows"
        @cell-click="editCell"
      )

        el-table-column(
          label="Количество"
          width="auto"
          min-width="200"
          type="operations"
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
          width="150"
          type="envd"
        )
          template(slot-scope="{row: {usn_6}}")
            span.data-cell {{usn_6}}

      app-add.el-table-add(v-if="table.rows.length<14" @click.native="addRow" :title="'Добавить поле'")

</template>

<script>
import AppBreadcrumb from '@/components/admin/Breadcrumb'
import {capital, validateForm} from '@/plugins/mixins'

import AppDateChange from '@/components/admin/DateChange'
import AppAdd from '@/components/admin/Add'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  mixins: [capital, validateForm],
  head () {
    return {
      title: `Редактировать таблицу ${this.capital(this.table.name)} | ${process.env.appName}`
    }
  },
  components: {
    AppBreadcrumb,
    AppDateChange,
    AppAdd
  },
  async asyncData({store, params}) {
    
    const table = await store.dispatch('tables/fetchAdminByName', params.name)

    if (!table.rows.length) {
      const row = {
        tableId: table._id,
        uid: `${table.name}_0`,
        operations: 'Нулевая отчетность (операций нет)',
        usn_6: '',
        usn_7: '',
        osn: ''
      }
    
      table.rows.push(row)

      await store.dispatch('tables/rowAdd', row)
    }

    return {table}
  },
  data() {
    return {
      data: {
        path: '/admin/table-name',
        name: 'Редактор таблиц',
        title: ''
      },

      loading: false,
      showInput: false,
      cellOldInput: '',
      cellChangeInput: '',
      serverSendCell: {
        uid: '',
        key: '',
        value: ''
      },
      operations: [
        'Нулевая отчетность (операций нет)',
        '1 - 15 операций',
        '16 - 30 операций',
        '31 - 50 операций',
        '51 - 75 операций',
        '76 - 100 операций',
        '101 - 125 операций',
        '126 - 150 операций',
        '151 - 175 операций',
        '176 - 200 операций',
        '201 - 225 операций',
        '226 - 250 операций',
        '251 - 300 операций',
        'Более 300 операций'
      ],
      row: {
        tableId: '',
        uid: '',
        operations: '',
        usn_6: '',
        usn_7: '',
        osn: ''
      },
      rowUid: 0
    }
  },
  
  methods: {
    addRow() {
      ++this.rowUid

      this.row = {
        ...this.row,
        tableId: this.table._id,
        uid: `${this.table.name}_${this.rowUid}`,
        operations: this.operations[this.rowUid]
      }

      this.table.rows.push({...this.row})
    
      const row = {...this.row}

      this.$store.dispatch('tables/rowAdd', row)
    },

    dateNow() {
      this.table.date = new Date().toISOString()
    },

    editCell(row, column, cell, event) {
      const inp = this.$refs['input-el']

      this.serverSendCell = {
        uid: row.uid,
        value: ''
      }
      this.serverSendCell.key = (column.type === 'envd') ? 'usn_6' : column.type


      // find cell and to paste in this cell input
      cell.firstChild.appendChild(inp)
      this.showInput = true

      // add time for first focus
      if (this.showInput) {
        setTimeout(() => {
            inp.focus()
        }, 0)
      }

      // initial data in input
      this.cellChangeInput = cell.textContent

      // the reserve old data for comparison with input
      this.cellOldInput = cell.textContent
    },

    applyChange() {
      this.showInput = false

      if (this.cellOldInput !== this.cellChangeInput) {
        this.serverSendCell.value = this.cellChangeInput

        let row = this.table.rows.filter(x => x.uid === this.serverSendCell.uid)[0]
        row[this.serverSendCell.key] = this.cellChangeInput

        this.$store.dispatch('tables/cellUpdate', this.serverSendCell)

        this.dateNow()
      }
    },

    async showTable() {
      await this.$store.dispatch('tables/present', {name: this.table.name, present: this.table.present})
      const message = this.table.present ? 'Теперь клиенты видят таблицу' : 'Таблица скрыта от клиентов'

      this.dateNow()

      this.$message.success(message)
    }
  },
  created() {
    this.data.title = `Таблица ${this.capital(this.table.name)}`

    if (this.table.rows) {
      this.rowUid = this.table.rows.length - 1
    }

  }
}
</script>

<style lang="stylus">
.price-table
  &-wrap
    display flex
    justify-content center
    align-items center
    flex-direction column
    .el-table
      max-width 1200px
      &-add
        margin-bottom 20px
      &--enable-row-hover
        .el-table__body tr
          &:hover
            &>td
              background rgba(220,188,150,.5)
              color inherit
          td
            position relative
            padding 0
            cursor pointer
            &:hover
              background rgba(220,188,150,.2)
  &-switcher
    display flex
    justify-content center
    align-items center
    flex-direction row
    .switch
      margin-left 10px
  .cell
    height 100%
    min-height 48px
    margin 0
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

  .el-table, .el-table tr, .el-table__body-wrapper, .el-table__body
    overflow visible
  .el-option
    padding 20px 0
  .el-table
    tr
      background-color #FFF5F5
    tbody
      tr
        &:first-child
          td
            border-top 1px solid #777
        td
          border-left 1px solid #777
          border-bottom 1px solid #777
          &:last-child
            border-right 1px solid #777

  .el-table--fit
    padding 1px 0

// create table
  .name-service
    display flex
    align-items center
    justify-content center
    flex-direction row

  .wrap-add
    max-height 100px
    opacity 1
    &.light-hide
      opacity 0
      max-height 0
      overflow hidden
      transition all .5s ease

  .input-cell
    height 100%
    width 100%
    position absolute
    left 0
    top 0
    padding 0 10px
    // outline 1px solid #429ce3
    border 1px solid #429ce3
</style>
