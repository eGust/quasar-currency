<template lang="pug">
  table
    thead
      tr
        th(v-for='n in (columnCount+1)')
    tbody
      CurrencyRow(v-for='row in currencyRows' :currency='row.currency' :amountColumns='row.amountColumns')
</template>

<script>
import CurrencyRow from './CurrencyRow'

export default {
  components: { CurrencyRow },
  props: ['currencyRows', 'columnCount'],
}
</script>

<style lang="scss">
</style>
