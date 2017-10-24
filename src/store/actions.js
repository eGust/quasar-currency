import PROVIDERS from './providers'

const API = 'http://egust.000webhostapp.com/currency_api/get_rates.php?api_version=2.0&provider='

export default {
  commitAction({ commit }, {action, payload = {}}) {
    console.log('commitAction', {action, payload})
    commit(action, payload)
  },
  updateSourceRates({ commit, state }, source = null) {
    if (source) {
      commit('setSource', {source})
    }

    source = source || state.source
    const cached = state.cache[source] || {}
    if (cached.timeout && Date.now() < cached.timeout) {
      return
    }

    fetch(API + source)
    .then((response) => response.json())
    .then((json) => {
      json.timeout = (json.updated_at + PROVIDERS[source].timeout) * 1000
      json.fetched = Date.now()
      commit('updateCache', json)
    })
  },
}
