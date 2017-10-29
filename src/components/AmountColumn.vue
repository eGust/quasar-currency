<template lang="pug">
  .column-amount
    .row.items-center
      .col-4
        q-btn(icon='edit' small round flat color='light-blue-5' @click='editColumnAmount')
      .col-8.text-right
        .amount {{ amount ? `${unit} ${amount.toFixed(isSource ? 2 : 3)}` : '-' }}
    .rate(v-if='!isSource') Rate = {{ rate ? rate.toFixed(4) : rate }}
</template>

<script>
import { QBtn, QInput } from 'quasar'
import Big from 'big.js'
import Vuex from 'vuex'
import storeData from '../store'

export default {
  components: { QBtn, QInput },
  props: ['isSource', 'rate', 'amount', 'row', 'col', 'currency'],
  computed: {
    ...Vuex.mapGetters(['getCurrency']),
    curr: function () {
      return this.getCurrency(this.currency)
    },
    unit: function () {
      return this.curr.currencySymbol
    },
  },
  methods: {
    editColumnAmount: function () {
      this.editingAmount = this.amount ? parseFloat(this.amount.toFixed(2)) : 0
      this.$store.commit('editColumnAmount', this)
    },
  },
}
</script>

<style scoped lang="scss">
.rate {
  font-size: 11pt;
}
</style>
