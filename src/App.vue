<template lang="pug">
  #q-app
    CurrencyTable(:currencyRows='currencyRows' :fromColumns='fromColumns' @commitAction='commitAction' @updateCurrencyRates='updateCurrencyRates')
</template>

<script>
import Vuex from 'vuex'
import storeData from './store'
import CurrencyTable from './components/CurrencyTable'

export default {
  components: {
    CurrencyTable
  },
  computed: {
    ...Vuex.mapState(Object.keys(storeData.state)),
    ...Vuex.mapGetters(Object.keys(storeData.getters)),
  },
  methods: Vuex.mapActions(Object.keys(storeData.actions)),
}
</script>

<style></style>
