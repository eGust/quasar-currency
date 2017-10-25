import _ from 'lodash'
import Vue from 'vue'

export default {
  selectColumn(state, {row, col}) {
    state.editingRow = row
    state.editingCol = col
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
  editRow(state, {row}) {
    state.changeRow = row
  },
  updateRow(state, {currency = null}) {
    if (currency) {
      Vue.set(state.rows, state.changeRow, currency)
    }
    state.changeRow = null
  },
  removeRow(state) {
    Vue.delete(state.rows, state.changeRow)
    state.changeRow = null
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
