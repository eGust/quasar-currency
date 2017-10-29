<template lang="pug">
  .row.items-center(:title='rateHint')
    .col-auto(v-if='!amountColumn.isSource')
      .rate {{ rate }}
    .col.text-right
      .amount {{ amountColumn.amount ? `${currencySymbol} ${amountColumn.amount.toFixed(amountColumn.isSource ? 2 : 3)}` : '-' }}
    .col-auto
      q-btn(icon='edit' small round flat color='light-blue-5' @click='editColumnAmount')
</template>

<script>
import { QBtn, QInput } from 'quasar'
import Big from 'big.js'
import Vuex from 'vuex'
import storeData from '../store'

export default {
  components: { QBtn, QInput },
  props: ['amountColumn', 'currency'],
  computed: {
    ...Vuex.mapGetters(['getCurrency']),
    currencySymbol() {
      return this.getCurrency(this.currency).currencySymbol
    },
    rate() {
      const rate = this.amountColumn.rate
      return rate ? rate.toFixed(4) : rate
    },
    rateHint() {
      return this.amountColumn.isSource ? null : `1 ${this.amountColumn.currency} = ${this.rate} ${this.currency}`
    },
  },
  methods: {
    editColumnAmount() {
      this.$store.commit('editColumnAmount', {
        toCurrency: this.currency,
        toAmount: parseFloat(this.amountColumn.amount.toFixed(2)),
        col: this.amountColumn.col,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.rate {
  font-size: 8pt;
  & > .hover {
    display: none;
  }
}
.row:hover .rate>.hover {
  display: inline;
}
</style>
