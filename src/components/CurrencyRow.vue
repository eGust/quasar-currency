<template lang="pug">
  tr.currency-row
    th.currency-title
      .row.items-center.justify-between
        q-icon.drag-handle(name='drag handle' size='25px')
        Currency(:currency='currency')
        q-btn(icon='settings' small round flat color='secondary' @click='startEditRow')
    td.amounts(v-for='amountCol in amountColumns')
      AmountColumn(
        :row='amountCol.row'
        :col='amountCol.col'
        :currency='currency'
        :isSource='amountCol.isSource'
        :rate='amountCol.rate'
        :amount='amountCol.amount'
      )
</template>

<script>
import { QBtn, QIcon } from 'quasar'
import Currency from './Currency'
import AmountColumn from './AmountColumn'

export default {
  components: { AmountColumn, Currency, QBtn, QIcon },
  props: ['currency', 'amountColumns', 'editingAmount', 'order', 'rowCount'],
  methods: {
    startEditRow: function () {
      this.$emit('commitAction', {action: 'editCurrencyRow', payload: {row: this.order}})
    },
    reorder: function (direction) {
      this.$emit('commitAction', {action: 'swapRow', payload: {row: this.order, direction}})
    },
  }
}
</script>

<style scoped lang="scss">
.drag-handle {
  cursor: move;
  color: #AAA;
  padding: 8px;
  &:hover {
    background-color: #CCC;
    color: #1976d2;
  }
}
</style>
