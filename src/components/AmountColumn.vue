<template lang="pug">
  .column-amount
    .editing(v-if='isEditing')
      q-input(
        type="number"
        v-model.number="editingAmount"
        ref="inputAmount"
        :stack-label='curr.currencyName'
        placeholder='Amount'
        :prefix='unit'
        :after=`[
          {
            icon: 'cancel',
            content: true,
            handler: clear,
          },
          {
            icon: 'done',
            condition: editingAmount || 0 !== 0,
            handler: apply,
          },
          {
            icon: 'clear',
            handler: cancel,
          },
        ]`,
    )
    .display(v-else)
      .row.items-center
        .col-8
          .amount(@dblclick='selectColumn') {{ amount ? `${unit} ${amount}` : amount }}
        .col-4
          q-btn.float-right(icon='edit' small round flat @click='selectColumn')
      .rate(v-if='!isSource') Rate = {{ rate }}
</template>

<script>
import Vue from 'vue'
import { QBtn, QInput } from 'quasar'
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
      this.editingAmount = this.amount || 0
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
      this.commitAction({action: 'submitColumnAmount', payload: { amount: this.editingAmount }})
    },
    cancel: function () {
      this.commitAction({action: 'cancelEditColumn'})
    },
    ...Vuex.mapActions(Object.keys(storeData.actions)),
  },
}
</script>

<style lang="scss"></style>
