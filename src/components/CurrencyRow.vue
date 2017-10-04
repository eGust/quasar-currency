<template lang="pug">
  tr.currency-row
    th.currency-title
      .row.items-center
        .col-4.text-right
          q-btn(icon='settings' small round flat color='secondary' @click='')
        .col-8.text-left
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
import { QBtn } from 'quasar'
import Currency from './Currency'
import AmountColumn from './AmountColumn'

export default {
  components: { AmountColumn, Currency, QBtn },
  props: ['currency', 'amountColumns', 'editingAmount'],
}
</script>

<style lang="scss">
</style>
