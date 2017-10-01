const API = 'http://egust.000webhostapp.com/currency_api/get_rates.php?api_version=2.0&provider='

export default {
  commit({ commit }, action, args) {
    commit(action, args)
  },
  updateCurrencyRates({ commit, state }) {
    fetch(API + state.source)
    .then((response) => {
      commit('updateCurrencyRates', response.json())
    })
  },
}
