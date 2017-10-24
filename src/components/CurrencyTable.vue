<template lang="pug">
  table.q-table.highlight.bordered.cell-separator.striped(style='width: 100%; table-layout: fixed')
    thead
      tr
        td
        th(v-for='(col, key) in fromColumns' :key='key')
          .row
            .col-6
              Currency(:currency='col.currency')
            .col-6.text-right {{ col.amount.toFixed(2) }}
    tbody
      CurrencyRow(
        v-for='(row, i) in currencyRows'
        :currency='row.currency'
        :amountColumns='row.amountColumns'
        :key='row.currency'
        :order='i'
        :rowCount='rowCount'
        @commitAction='commitAction'
      )
    tfoot
      tr
        th.text-center
          q-btn(icon='add' round color='primary' @click='addCurrencyRow')
        td(:colspan='fromColumns.length')
          .row
            .col-4.text-left Fetched at {{ fetched }}
            .col-4.text-center Updated at {{ timestamp }}
            .col-4.text-right Timeout at {{ timeout }}
</template>

<script>
import { QBtn } from 'quasar'
import moment from 'moment'
import Currency from './Currency'
import CurrencyRow from './CurrencyRow'

export default {
  components: { CurrencyRow, Currency, QBtn },
  props: [ 'currencyRows', 'fromColumns', 'timestamps' ],
  computed: {
    rowCount: function () {
      return this.currencyRows.length
    },
    fetched: function () {
      return this.timestamps.fetched ? moment(this.timestamps.fetched).format('HH:mm:ss') : 'N/A'
    },
    timeout: function () {
      return this.timestamps.timeout ? moment(this.timestamps.timeout).format('HH:mm:ss') : 'N/A'
    },
    timestamp: function () {
      return this.timestamps.timestamp ? moment(this.timestamps.timestamp*1000).format('HH:mm:ss') : 'N/A'
    },
  },
  methods: {
    commitAction: function (data) {
      this.$emit('commitAction', data)
    },
    addCurrencyRow: function () {
      this.$emit('commitAction', {action: 'editRow', payload: {row: this.rowCount}})
    },
  },
}
</script>

<style lang="scss">
</style>
