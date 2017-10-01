import _ from 'lodash'

export default {
  selectColumn(state, {row, col}) {
    state.editingRow = row
    state.editingCol = col
  },
  setColumnSourceAmount(state, {row, col, amount}) {
    Vue.set(state.fromColumns, col-1, {
      currency: state.rows[row-1],
      amount,
    })
  },
  updateCurrencyRates(state, {rates}) {
    state.rates = rates
  },
}
