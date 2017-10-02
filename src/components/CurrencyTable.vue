<template lang="pug">
  table
    thead
      tr
        td
        th(v-for='(col, key) in fromColumns' :key='key')
          .col {{ col.currency }}
    tbody
      CurrencyRow(v-for='row in currencyRows' :currency='row.currency' :amountColumns='row.amountColumns' :key='row.currency')
</template>

<script>
import CurrencyRow from './CurrencyRow'

export default {
  components: { CurrencyRow },
  props: ['currencyRows', 'fromColumns'],
}
</script>

<style lang="scss">
</style>
