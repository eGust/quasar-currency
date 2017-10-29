<template lang="pug">
  q-list(highlight inset-separator)
    q-item
      q-item-side
        q-btn(icon='arrow back' small round flat @click='updateCurrency(null)')
      q-item-main.header.text-center(v-if='rowCurrencyBeforeChange')
        .title Change Currency:
        Currency(:currency='rowCurrencyBeforeChange')
        q-btn.float-right(icon='delete forever' color='red' @click='removeCurrency' :disabled='!removable') Remove
      q-item-main(v-else)
        .text-center Add Currency
    q-item
      q-item-main
        q-input(
          stack-label='Select Currency'
          v-model="editingCurrency"
          ref="inputCurrency"
          placeholder='Type to Search...'
          autofocus
        )
    q-item(v-for='currency in filteredCurrencies' :key='currency.curr' link @click='updateCurrency(currency.curr)')
      q-item-side
        i.icon.flag(:class='`flag-${currency.curr}`')
      q-item-main
        h6 {{ currency.curr }} ({{ currency.currencySymbol }})
        | {{ currency.currencyName }}
</template>

<script>
import { QList, QBtn, QItem, QItemMain, QItemSide, QInput } from 'quasar'
import Currency from './Currency'

export default {
  data: () => ({
    editingCurrency: null,
  }),
  components: { Currency, QList, QBtn, QItem, QItemMain, QItemSide, QInput },
  props: [ 'rowCurrencyBeforeChange', 'availableCurrencies', 'removable' ],
  computed: {
    filteredCurrencies() {
      const key = (this.editingCurrency || '').trim().toLowerCase()
          , matched = []
          , unmatched = []
      if (!key.length) return this.availableCurrencies

      _(this.availableCurrencies).each((currency) => {
        if (currency.search.indexOf(key) >= 0) {
          matched.push(currency)
        } else {
          unmatched.push(currency)
        }
      })

      const temp = _(unmatched).filter(({search}) => {
        let pos = 0
        for (const c of key) {
          pos = search.indexOf(c, pos)
          if (pos < 0) return false
        }
        return true
      }).value()

      return _.concat(matched, temp)
    },
  },
  methods: {
    removeCurrency() {
      this.$store.commit('removeRow')
    },
    updateCurrency(currency) {
      this.$store.commit('updateRow', { currency })
    },
  },
}
</script>

<style scoped lang="scss">
.header > * {
  display: inline;
}
.header > .title {
  margin-right: 8px;
}
</style>
