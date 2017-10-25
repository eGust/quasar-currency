import _ from 'lodash'
import Vue from 'vue'

export default {
  editColumnAmount(state, {row = null, col = null}) {
    state.editingAmount = row && {row, col}
  },
  cancelEditColumn(state) {
    state.editingRow = null
    state.editingCol = null
  },
  submitColumnAmount(state, {amount}) {
    Vue.set(state.fromColumns, state.editingCol, {
      currency: state.rows[state.editingRow],
      amount,
    })
    state.editingRow = null
    state.editingCol = null
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
