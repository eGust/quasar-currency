<template lang="pug">
  #q-app
    CurrencyTable(currency-rows=currencyRows column-count=columnCount)
</template>

<script>
import Vuex from 'vuex'
import CurrencyTable from './components/CurrencyTable'
import storeData from './store'

export default {
  components: {
    CurrencyTable
  },
  computed: Vuex.mapState(Object.keys(storeData.getters)),
  methods: Vuex.mapState(Object.keys(storeData.actions)),
}
</script>

<style></style>
