<template lang="pug">
  .wrap
    q-toolbar
      q-btn(icon='clear' small round flat @click='cancel')
      q-toolbar-title.row.items-center.justify-center
          .col-auto From:
          .col-auto.currency
            Currency(:currency='editing.fromCurrency')
          .col-auto {{ editing.fromAmount }}
      q-btn(icon='done' small round flat :disable='editingAmount==0' @click='apply')
    .row.items-center.h-padding
      .col-auto New:
      Currency.currency.col-auto(:currency='editing.toCurrency')
      q-input.amount.col(
        ref="inputAmount"
        v-model.number="editingAmount"
        type="number"
        placeholder='Amount'
        @keyup.enter='apply'
        @keyup.esc='cancel'
        :after=`[
          {
            icon: 'cancel',
            content: true,
            handler: clear,
          },
        ]`
      )
</template>

<script>
import { QToolbar, QToolbarTitle, QBtn, QInput } from 'quasar';
import Vue from 'vue';
import Currency from './Currency';

export default {
  data: () => ({
    editingAmount: 0,
  }),
  components: {
    QToolbar, QToolbarTitle, QBtn, QInput, Currency,
  },
  props: ['editing'],
  methods: {
    cancel() {
      this.$store.commit('editColumnAmount');
    },
    clear() {
      this.editingAmount = 0;
      Vue.nextTick(() => {
        this.$refs.inputAmount.select();
      });
    },
    apply() {
      const amount = this.editingAmount;
      if (amount === 0) return;
      this.$store.commit('submitColumnAmount', { amount });
    },
  },
  beforeMount() {
    this.editingAmount = this.editing.toAmount;
    Vue.nextTick(() => {
      this.$refs.inputAmount.select();
    });
  },
};

</script>

<style scoped lang="scss">
.h-padding {
  padding: 0 5px;
}
.currency {
  padding: 5px;
}
.amount {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
