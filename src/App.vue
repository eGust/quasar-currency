<template lang="pug">
  #q-app
    EditRowCurrency(
      v-if='editingCurrencyRow != null'
      :rowCurrencyBeforeChange='rowCurrencyBeforeChange'
      :availableCurrencies='availableCurrencies'
      :removable='rows.length > 1'
    )
    EditColumnAmount(
      v-if='editingAmount != null'
      :editing='editingAmount'
    )
    .main(v-show='editingCurrencyRow == null && editingAmount == null')
      MainToolbar(:source='source' @updateSourceRates='updateSourceRates')
      CurrencyTable(
        :currencyRows='currencyRows'
        :fromColumns='fromColumns'
        :timestamps='timestamps'
      )
</template>

<script>
import Vuex from 'vuex';
import storeData from './store';
import MainToolbar from './components/MainToolbar';
import CurrencyTable from './components/CurrencyTable';
import EditRowCurrency from './components/EditRowCurrency';
import EditColumnAmount from './components/EditColumnAmount';

export default {
  components: {
    MainToolbar, CurrencyTable, EditRowCurrency, EditColumnAmount,
  },
  computed: {
    ...Vuex.mapState(Object.keys(storeData.state)),
    ...Vuex.mapGetters(Object.keys(storeData.getters)),
  },
  methods: Vuex.mapActions(Object.keys(storeData.actions)),
};
</script>

<style lang="scss">
  #q-app {
    display: block;
    margin: 0 auto;
    max-width: 960px;
  }
</style>
