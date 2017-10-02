import _ from 'lodash'
import CURRENCIES from './currencies'
import mutations from './mutations'
import actions from './actions'
import PROVIDERS from './providers'

export default {
  state: {
    rates: {},
    rows: [ 'USD', 'CNY', 'EUR', ],
    fromColumns: [ { currency: 'USD', amount: 100, }, ],
    editingRow: null,
    editingCol: null,
    providers: _(PROVIDERS).values().cloneDeep(),
    source: _.keys(PROVIDERS)[0],
  },
  getters: {
    getRate: ({ rates }) => (fromCurr, toCurr) => fromCurr === toCurr ? 1 : (rates[toCurr] && rates[fromCurr] ? rates[toCurr] / rates[fromCurr] : NaN),
    currencyRows: ({ editingRow, editingCol, rows, fromColumns }, { getRate }) => 
    _.map(rows,
      (toCurr, row) => ({
        currency: toCurr,
        amountColumns: _.map(fromColumns,
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
        ),
      })
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
    provider: ({ source }) => PROVIDERS[source],
  },
  mutations,
  actions,
}
