import _ from 'lodash'
import CURRENCIES from './currencies'

export default {
  state: {
    rates: {},
    rows: [],
    fromColumns: [],
    editingRow: null,
    editingCol: null,
  },
  getters: {
    getRate: ({ rates }) => (fromCurr, toCurr) => fromCurr === toCurr ? 1 : rates[toCurr] / rates[fromCurr],
    currencyRows: (state, { getRate }) => _.map(state.rows,
      (toCurr, row) => _.map(fromColumns,
        ({ currency: fromCurr, amount: fromAmount }, col) => {
          const rate = getRate(fromCurr, toCurr)
          return {
            row, col,
            rate,
            amount: fromAmount * rate,
            isSource: fromCurr === toCurr,
            isEditing: row === editingRow && col === editingCol,
          }
        }
      )
    ),
    columnCount: ({ fromColumns }) => fromColumns.length,
    availableCurrencies: ({ fromColumns }) => {
      const available = {}
      _.each(CURRENCIES, (v, k) => available[k] = true)
      _.each(fromColumns, ({currency}) => {
        available[currency] = false
      })
      return _(CURRENCIES).filter(({ curr }) => available[curr])
        .map((v) => v).sort(({ order: o1 }, { order: o2 }) => o1 - o2)
        .value()
    },
  },
}
