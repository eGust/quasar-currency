import Big from 'big.js';
import Vue from 'vue';

export default {
  editColumnAmount(state, payload = null) {
    if (payload) {
      const from = state.fromColumns[payload.col];
      payload.fromAmount = from.amount.toFixed(2);
      payload.fromCurrency = from.currency;
    }
    state.editingAmount = payload;
  },
  submitColumnAmount(state, { amount }) {
    const { col, toCurrency } = state.editingAmount;
    console.log({ col, toCurrency, amount });
    Vue.set(state.fromColumns, col, {
      currency: toCurrency,
      amount: new Big(amount),
    });
    state.editingAmount = null;
  },
  editCurrencyRow(state, { row }) {
    state.editingCurrencyRow = row;
  },
  updateRow(state, { currency = null }) {
    if (currency) {
      Vue.set(state.rows, state.editingCurrencyRow, currency);
    }
    state.editingCurrencyRow = null;
  },
  removeRow(state) {
    Vue.delete(state.rows, state.editingCurrencyRow);
    state.editingCurrencyRow = null;
  },
  setCurrencyRows(state, { rows }) {
    Vue.set(state, 'rows', rows);
  },
  setSource(state, { source }) {
    state.source = source;
  },
  updateCache(state, json) {
    Vue.set(state.cache, state.source, json);
  },
};
