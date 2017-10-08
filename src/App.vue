<template lang="pug">
  #q-app
    ChangeRow(
      v-if='changeRow != null'
      :rowCurrencyBeforeChange='rowCurrencyBeforeChange'
      :availableCurrencies='availableCurrencies'
      @commitAction='commitAction'
    )
    CurrencyTable(
      v-else
      :currencyRows='currencyRows'
      :fromColumns='fromColumns'
      @commitAction='commitAction'
    )
</template>

<script>
import Vuex from 'vuex'
import storeData from './store'
import CurrencyTable from './components/CurrencyTable'
import ChangeRow from './components/ChangeRow'

export default {
  components: {
    CurrencyTable, ChangeRow
  },
  computed: {
    ...Vuex.mapState(Object.keys(storeData.state)),
    ...Vuex.mapGetters(Object.keys(storeData.getters)),
  },
  methods: Vuex.mapActions(Object.keys(storeData.actions)),
}
</script>

<style></style>
