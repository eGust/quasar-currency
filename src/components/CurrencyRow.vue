<template lang="pug">
  tr.currency-row
    th.currency-title
      .row.items-center.justify-between
        q-icon.drag-handle(name='drag handle' size='25px')
        Currency(:currency='currency')
        q-btn(icon='settings' small round flat color='secondary' @click='startEditRow')
    td.amounts(v-for='amountCol in amountColumns')
      AmountColumn(
        :amountColumn='amountCol'
        :currency='currency'
      )
</template>

<script>
import { QBtn, QIcon } from 'quasar';
import Currency from './Currency';
import AmountColumn from './AmountColumn';

export default {
  components: {
    AmountColumn, Currency, QBtn, QIcon,
  },
  props: ['currency', 'amountColumns', 'editingAmount', 'order', 'rowCount'],
  methods: {
    startEditRow() {
      this.$store.commit('editCurrencyRow', { row: this.order });
    },
    reorder(direction) {
      this.$store.commit('swapRow', { row: this.order, direction });
    },
  },
};
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
