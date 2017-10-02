<template lang="pug">
  table.q-table.highlight.bordered.cell-separator.striped(style='width: 100%; table-layout: fixed')
    thead
      tr
        td
        th(v-for='(col, key) in fromColumns' :key='key')
          .row
            .col-6 {{ col.currency }}
            .col-6.text-right {{ col.amount }}
    tbody
      CurrencyRow(v-for='row in currencyRows' :currency='row.currency' :amountColumns='row.amountColumns' :key='row.currency')
</template>

<script>
import CurrencyRow from './CurrencyRow'

export default {
  components: { CurrencyRow },
  props: ['currencyRows', 'fromColumns', 'editingAmount'],
}
</script>

<style lang="scss">
</style>
