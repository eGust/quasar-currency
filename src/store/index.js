import _ from 'lodash'
import Big from 'big.js'
import CURRENCIES from './currencies'
import mutations from './mutations'
import actions from './actions'
import PROVIDERS from './providers'
import storage from '../storage'

_.each(CURRENCIES, (cur) => {
  cur.search = `${cur.curr} ${cur.currencyName}`.toLowerCase()
})

const DEFAULT_STATE = {
    cache: {},
    source: _.keys(PROVIDERS)[0],
    rows: [ 'USD', 'CNY', 'EUR', ],
    fromColumns: [
      { currency: 'USD', amount: 100, },
      { currency: 'CNY', amount: 100, },
    ],
  }

function getState() {
  const { fromColumns, ...state } = storage.load() || DEFAULT_STATE
  return {
    ...state,
    fromColumns: _.map(fromColumns, ({ currency, amount }) => ({ currency, amount: new Big(amount) })),
  }
}

export default {
  state: {
    ...getState(),
    editingAmount: null,
    editingCurrencyRow: null,
  },
  getters: {
    currencyRows: ({ rows, fromColumns, cache, source, }) => {
      const rates = (cache[source] || {}).rates || {}
      return _.map(rows,
        (toCurr, row) => ({
          currency: toCurr,
          amountColumns: _.map(fromColumns,
            ({ currency: fromCurr, amount: fromAmount }, col) => {
              const rate = fromCurr === toCurr ? 1 : (rates[toCurr] && rates[fromCurr] ? rates[toCurr] / rates[fromCurr] : NaN)
              return {
                row, col,
                rate: _.isNaN(rate) ? NaN : new Big(rate),
                currency: fromCurr,
                amount: _.isNaN(rate) ? NaN : fromAmount.times(rate),
                isSource: fromCurr === toCurr,
              }
            }
          ),
        })
      )
    },
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
    rowCurrencyBeforeChange: ({ rows, editingCurrencyRow }) => rows[editingCurrencyRow] || null,
    timestamps: ({ cache, source }) => {
      const { fetched, timeout, timestamp } = cache[source] || {}
      return { fetched, timeout, timestamp }
    },
  },
  mutations,
  actions,
}
