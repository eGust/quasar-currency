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
      CurrencyRow(v-for='row in currencyRows' :currency='row.currency' :amountColumns='row.amountColumns' :key='row.currency')
    tfoot
      tr
        th.text-center
          q-btn(icon='add' round color='primary' @click='')
</template>

<script>
import { QBtn } from 'quasar'
import Currency from './Currency'
import CurrencyRow from './CurrencyRow'

export default {
  components: { CurrencyRow, Currency, QBtn },
  props: [ 'currencyRows', 'fromColumns', 'editingAmount' ],
}
</script>

<style lang="scss">
</style>
