import Big from 'big.js'
import Vue from 'vue'

export default {
  editColumnAmount(state, payload = {}) {
    const {row = null, col = null, amount = null} = payload
    state.editingAmount = row == null ? null : {
      row, col,
      amount: parseFloat(amount.toFixed(2)),
      current: state.fromColumns[col],
      toCurrency: state.rows[row],
    }
  },
  cancelEditColumn(state) {
    state.editingRow = null
    state.editingCol = null
  },
  submitColumnAmount(state, {amount}) {
    const { col, toCurrency } = state.editingAmount
    Vue.set(state.fromColumns, col, {
      currency: toCurrency,
      amount: new Big(amount),
    })
    state.editingAmount = null
  },
  editCurrencyRow(state, {row}) {
    state.editingCurrencyRow = row
  },
  updateRow(state, {currency = null}) {
    if (currency) {
      Vue.set(state.rows, state.editingCurrencyRow, currency)
    }
    state.editingCurrencyRow = null
  },
  removeRow(state) {
    Vue.delete(state.rows, state.editingCurrencyRow)
    state.editingCurrencyRow = null
  },
  setCurrencyRows(state, {rows}) {
    Vue.set(state, 'rows', rows)
  },
  setSource(state, {source}) {
    state.source = source
  },
  updateCache(state, json) {
    Vue.set(state.cache, state.source, json)
  },
}
