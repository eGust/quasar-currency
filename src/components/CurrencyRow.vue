<template lang="pug">
  tr.currency-row
    th.currency-title
      Currency(:currency='currency')
    td.amounts(v-for='amountCol in amountColumns')
      AmountColumn(
        :row='amountCol.row'
        :col='amountCol.col'
        :currency='currency'
        :isSource='amountCol.isSource'
        :isEditing='amountCol.isEditing'
        :rate='amountCol.rate'
        :amount='amountCol.amount'
      )
</template>

<script>
import Currency from './Currency'
import AmountColumn from './AmountColumn'

export default {
  components: { AmountColumn, Currency },
  props: ['currency', 'amountColumns', 'editingAmount'],
}
</script>

<style lang="scss">
</style>
