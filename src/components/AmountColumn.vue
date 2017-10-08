<template lang="pug">
  .column-amount
    .editing(v-if='isEditing')
      q-input(
        ref="inputAmount"
        v-model.number="editingAmount"
        type="number"
        placeholder='Amount'
        :stack-label='curr.currencyName'
        @keyup.enter='apply'
        @keyup.esc='cancel'
        :prefix='unit'
        :after=`[
          {
            icon: 'cancel',
            content: true,
            handler: clear,
          },
          {
            icon: 'done',
            condition: (editingAmount || 0) !== 0,
            handler: apply,
          },
          {
            icon: 'clear',
            handler: cancel,
          },
        ]`
      )
    .display(v-else)
      .row.items-center
        .col-8
          q-btn(icon='edit' small round flat color='light-blue-5' @click='selectColumn')
        .col-4.text-right
          .amount {{ amount ? `${unit} ${amount.toFixed(isSource ? 2 : 3)}` : '-' }}
      .rate(v-if='!isSource') Rate = {{ rate }}
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
  props: ['isSource', 'isEditing', 'rate', 'amount', 'row', 'col', 'currency'],
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
    selectColumn: function () {
      this.editingAmount = this.amount ? parseFloat(this.amount) : 0
      this.commitAction({action: 'selectColumn', payload: this})
      Vue.nextTick(() => {
        // console.log(this.$refs)
        this.$refs.inputAmount.select()
      })
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

<style lang="scss"></style>
