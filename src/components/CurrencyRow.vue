<template lang="pug">
  tr.currency-row
    th.currency-title
      .row.items-center.justify-between
        .reorder
          q-btn(icon='arrow drop up' small round flat :disabled='order==0' @click='reorder(-1)')
          q-btn(icon='arrow drop down' small round flat :disabled='order==rowCount-1' @click='reorder(1)')
        Currency(:currency='currency')
        q-btn(icon='settings' small round flat color='secondary' @click='startEditRow')
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
  props: ['currency', 'amountColumns', 'editingAmount', 'order', 'rowCount'],
  methods: {
    startEditRow: function () {
      this.$emit('commitAction', {action: 'editRow', payload: {row: this.order}})
    },
    reorder: function (direction) {
      this.$emit('commitAction', {action: 'swapRow', payload: {row: this.order, direction}})
    },
  }
}
</script>

<style lang="scss">
</style>
