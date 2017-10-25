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
import Vue from 'vue'
import { QBtn, QInput } from 'quasar'
import Big from 'big.js'
import Vuex from 'vuex'
import storeData from '../store'

export default {
  data: () => ({
    editingAmount: 0,
  }),
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
      this.commitAction({action: 'editColumnAmount', payload: this})
    },
    clear: function () {
      this.editingAmount = ''
    },
    apply: function () {
      const amount = this.editingAmount
      if (!amount) return
      this.commitAction({action: 'submitColumnAmount', payload: { amount: new Big(amount).round(2) }})
    },
    cancel: function () {
      this.commitAction({action: 'cancelEditColumn'})
    },
    ...Vuex.mapActions(Object.keys(storeData.actions)),
  },
}
</script>

<style scoped lang="scss">
.rate {
  font-size: 11pt;
}
</style>
