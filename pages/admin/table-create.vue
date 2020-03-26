<template lang="pug">
  .price-list-create
    h3 Создание таблицы
    app-date-change(:date-last="Date().toLocaleString()")
    input.input-cell(ref="input-el" v-model="cellChangeInput" @blur="applyChange" v-show="showInput" @keyup.13="applyChange")

    el-form-item
      el-table(
        :data="table"
        @cell-click="editCell"
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
          template(slot-scope="{row: {usn_7}}")
            span.data-cell {{usn_7}}

        el-table-column(
          prop="osn"
          label="ОСН"
          width="150"
        )
          template(slot-scope="{row: {osn}}")
            span.data-cell {{osn}}

        el-table-column(
          prop="usn_6"
          label="ЕНВД"
          width="150"
        )
          template(slot-scope="{row: {usn_6}}")
            span.data-cell {{usn_6}}

      .wrap-add(:class="{'light-hide': isFullUid}")
        app-add(@click.native="addRow")

      .wrap-saver
        el-form-item.button-wrap
          el-button(
            type="primary"
            native-type="submit"
            :loading="loading"
          )

            span.text-button Сохранить таблицу
</template>

<script>
import AppDateChange from '@/components/admin/DateChange'
import {validateForm} from '@/plugins/mixins'
import AppAdd from '@/components/admin/Add'
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  mixins: [validateForm],
  head: {
    title: `Создание нового тарифа | ${process.env.appName}`
  },
  components: {
    AppDateChange,
    AppAdd
  },
  data() {
    return {
      loading: false,
      isFullUid: false,
      borderData: '',
      showInput: false,
      dataElem: '',
      cellChangeInput: '',
      controls: {
        title: ''
      },
      operations: [
        'Нулевая отчетность (операций нет)',
        '1-15 операций',
        '16-30 операций',
        '31-50 операций',
        '51-75 операций',
        '76-100 операций',
        '101-125 операций',
        '126-150 операций',
        '151-175 операций',
        '176-200 операций',
        '201-225 операций',
        '226-250 операций',
        '251-300 операций',
        'Более 300 операций'
      ],
      row: {
        uid: '',
        operations: '',
        usn_6: '',
        usn_7: '',
        osn: ''
      },
      rowUid: -1,
      table: []
    }
  },
  methods: {
    addRow() {
      ++this.rowUid

      this.row = {
        ...this.row,
        uid: `row_${this.rowUid}`,
        operations: this.operations[this.rowUid]
      }

      this.table.push({...this.row})
      
      if (this.rowUid > 12) {
        this.isFullUid = true
        return false
      }
    },

    editCell(row, column, cell, event) {
      const inp = this.$refs['input-el']

      // find cell and to paste in this cell input
      cell.firstChild.appendChild(inp)
      this.showInput = true

      // add time for first focus
      if (this.showInput) {
        setTimeout(() => {
            inp.focus()
        }, 0)
      }


      // if (this.borderData) {
      //   this.borderData.classList.remove('border-show')
      // }
      // this.borderData = cell
      // this.borderData.classList.add('border-show')

      // if (event.target.parentNode.classList[0] === 'cell') {
      //   this.cellChangeInput = event.originalTarget.innerHtml
      //   this.showInput = true
      //   this.dataElem = event.originalTarget
      //   event.target.parentNode.appendChild(this.$refs['input-el'])
      //   if (this.$refs['input-el'].style.display = 'block') {
      //     this.$refs['input-el'].focus()
      //   }
      // } else {
      //   console.log('test')
      // }
    },

    applyChange() {
      this.showInput = false
    },

    onSubmit(nameForm) {
      this.$refs[nameForm].validate(async valid => {
        if (valid) {
          await this.$confirm('Точно сохранить таблицу?', 'Внимание!', {
            confirmButtonText: 'Да, определенно',
            cancelButtonText: 'Нет',
            type: 'warning'
          })

          this.loading = true

          const formData = {
            name: this.controls.title,
            table: this.table
          }

          try {
            // await this.$store.dispatch("tables/create", formData)

            this.$message.success("Таблица успешно создана!")
          } catch (e) {
          } finally {
            this.loading = false
          }
        }
      })
    }
  },
  created() {
    this.addRow()
  }
}
</script>

<style lang="stylus">
.price-list-create
  width 100%
  display flex
  justify-content center
  align-items center
  flex-direction column
  .el-form-item__content
    display flex
    justify-content center
    align-items center
    flex-direction column
  .data-cell
    // border none
  .el-table
    max-width 1200px

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
  .input-cell
    height 100%
    width 100%
    position absolute
    left 0
    top 0
    padding 0 10px
    outline 1px solid #429ce3
    border none
    // border 1px solid #429ce3
  .border-show
    outline 1px solid #429ce3!important

  .el-table, .el-table tr, .el-table__body-wrapper, .el-table__body
    overflow visible
  .el-option
    padding 20px 0
  .el-table
    tr
      background-color #fdd

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
  .title-block
    width: 100%
    max-width 800px
    &-wrap
      width 100%
      padding 30px 0

  .name-service
    display flex
    align-items center
    justify-content center
    flex-direction row

  .wrap-saver
    padding 20px 0
    .el-button
      font-size 18px
  .wrap-add
    max-height 100px
    opacity 1
    &.light-hide
      opacity 0
      max-height 0
      overflow hidden
      transition all .5s ease
    
  
</style>
