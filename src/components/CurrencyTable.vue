<template lang="pug">
  table.q-table.highlight.bordered.cell-separator.striped(style='width: 100%; table-layout: fixed')
    thead
      tr
        td
        th(v-for='(col, key) in fromColumns' :key='key')
          .row.items-center
            .col-auto
              Currency(:currency='col.currency')
            .col.text-right {{ col.amount.toFixed(2) }}
            .col-auto
              q-btn(icon='edit' small round flat color='light-blue-5' @click='editColumnAmount(key, col)')
    Draggable(v-model='rows' element='tbody' :options='draggableOptions')
      CurrencyRow(
        v-for='(row, i) in rows'
        :currency='row.currency'
        :amountColumns='row.amountColumns'
        :key='row.currency'
        :order='i'
        :rowCount='rowCount'
      )
    tfoot
      tr
        th.text-center
          q-btn(icon='add' round color='primary' @click='addCurrencyRow')
        td(:colspan='fromColumns.length')
          .row.timestamp
            .col-4.text-left Fetched at {{ fetched }}
            .col-4.text-center Updated at {{ timestamp }}
            .col-4.text-right Timeout at {{ timeout }}
</template>

<script>
import { QBtn } from 'quasar';
import moment from 'moment';
import Draggable from 'vuedraggable';

import Currency from './Currency';
import CurrencyRow from './CurrencyRow';

const DRAGGABLE_OPTIONS = { handle: '.drag-handle' };

export default {
  components: {
    CurrencyRow, Currency, QBtn, Draggable,
  },
  props: ['currencyRows', 'fromColumns', 'timestamps'],
  computed: {
    rows: {
      get() {
        return this.currencyRows;
      },
      set(value) {
        this.$store.commit('setCurrencyRows', { rows: value.map(({ currency }) => currency) });
      },
    },
    rowCount() {
      return this.currencyRows.length;
    },
    fetched() {
      return this.timestamps.fetched ? moment(this.timestamps.fetched).format('HH:mm:ss') : 'N/A';
    },
    timeout() {
      return this.timestamps.timeout ? moment(this.timestamps.timeout).format('HH:mm:ss') : 'N/A';
    },
    timestamp() {
      return this.timestamps.timestamp ? moment(this.timestamps.timestamp * 1000).format('HH:mm:ss') : 'N/A';
    },
    draggableOptions: () => DRAGGABLE_OPTIONS,
  },
  methods: {
    addCurrencyRow() {
      this.$store.commit('editCurrencyRow', { row: this.rowCount });
    },
    editColumnAmount(col, { amount, currency }) {
      this.$store.commit('editColumnAmount', {
        col,
        toCurrency: currency,
        toAmount: parseFloat(amount.toFixed(2)),
      });
    },
  },
};
</script>

<style scoped lang="scss">
.timestamp {
  font-size: 9pt;
}
</style>
