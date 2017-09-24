<template lang="pug">
  tr.currency-row
    th.currency-title
      Currency(:currency='currency')
    td.amounts(v-for='amountCol in amountColumns')
      AmountColumn(
        :is-source='amountCol.isSource'
        :is-editing='amountCol.isEditing'
        :rate='amountCol.rate'
        :amount='amountCol.amount'
      )
</template>

<script>
import Currency from './Currency'
import AmountColumn from './AmountColumn'

export default {
  components: { AmountColumn, Currency },
  props: ['currency', 'amountColumns'],
}
</script>

<style lang="scss">
</style>
