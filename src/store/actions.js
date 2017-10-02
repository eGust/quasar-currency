const API = 'http://egust.000webhostapp.com/currency_api/get_rates.php?api_version=2.0&provider='

export default {
  commitAction({ commit }, {action, payload = {}}) {
    console.log('commitAction', {action, payload})
    commit(action, payload)
  },
  updateCurrencyRates({ commit, state }) {
    fetch(API + state.source)
    .then((response) => {
      commit('updateCurrencyRates', response.json())
    })
  },
}
