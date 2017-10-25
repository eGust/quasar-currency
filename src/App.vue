<template lang="pug">
  #q-app
    .edit(v-if='changeRow != null')
      ChangeRow(
        :rowCurrencyBeforeChange='rowCurrencyBeforeChange'
        :availableCurrencies='availableCurrencies'
        :removable='rows.length > 1'
        @commitAction='commitAction'
      )
    .main(v-else)
      Toolbar(:source='source' @updateSourceRates='updateSourceRates')
      CurrencyTable(
        :currencyRows='currencyRows'
        :fromColumns='fromColumns'
        :timestamps='timestamps'
        @commitAction='commitAction'
      )
</template>

<script>
import Vuex from 'vuex'
import storeData from './store'
import Toolbar from './components/Toolbar'
import CurrencyTable from './components/CurrencyTable'
import ChangeRow from './components/ChangeRow'

export default {
  components: {
    Toolbar, CurrencyTable, ChangeRow
  },
  computed: {
    ...Vuex.mapState(Object.keys(storeData.state)),
    ...Vuex.mapGetters(Object.keys(storeData.getters)),
  },
  methods: Vuex.mapActions(Object.keys(storeData.actions)),
}
</script>

<style></style>
