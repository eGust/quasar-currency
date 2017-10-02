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
  updateCurrencyRates(state, {rates}) {
    state.rates = rates
  },
}
