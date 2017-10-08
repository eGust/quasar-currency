import _ from 'lodash'
import Big from 'big.js'
import CURRENCIES from './currencies'
import mutations from './mutations'
import actions from './actions'
import PROVIDERS from './providers'

_.each(CURRENCIES, (cur) => {
  cur.search = `${cur.curr} ${cur.currencyName}`.toLowerCase()
})

export default {
  state: {
    rates: {},
    rows: [ 'USD', 'CNY', 'EUR', ],
    fromColumns: [
      { currency: 'USD', amount: new Big(100), },
      { currency: 'CNY', amount: new Big(100), },
      { currency: 'EUR', amount: new Big(100), },
    ],
    editingRow: null,
    editingCol: null,
    providers: _(PROVIDERS).values().cloneDeep(),
    source: _.keys(PROVIDERS)[0],
    changeRow: null,
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
              currency: fromCurr,
              amount: _.isNaN(rate) ? NaN : fromAmount.times(rate),
              isSource: fromCurr === toCurr,
              isEditing: row === editingRow && col === editingCol,
            }
          }
        ),
      })
    ),
    rowCount: ({ rows }) => rows.length,
    availableCurrencies: ({ rows }) => {
      const available = {}
      _.each(CURRENCIES, (v, k) => available[k] = true)
      _.each(rows, (currency) => {
        available[currency] = false
      })
      return _(CURRENCIES).filter(({ curr }) => available[curr])
        .map((v) => v).sort(({ order: o1 }, { order: o2 }) => o1 - o2)
        .value()
    },
    provider: ({ source }) => PROVIDERS[source],
    getCurrency: () => (curr) => CURRENCIES[curr],
    rowCurrencyBeforeChange: ({ rows, changeRow }) => rows[changeRow] || null,
  },
  mutations,
  actions,
}
