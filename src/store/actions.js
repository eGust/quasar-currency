import { Toast } from 'quasar';
import PROVIDERS from './providers';

const API = 'http://egust.000webhostapp.com/currency_api/get_rates.php?api_version=2.0&provider=';

export default {
  commitAction({ commit }, { action, payload = {} }) {
    // console.log('commitAction', {action, payload})
    commit(action, payload);
  },
  updateSourceRates({ commit, state }, src = null) {
    if (src) {
      commit('setSource', { src });
    }

    const source = src || state.source;
    const cached = state.cache[source] || {};
    const provider = PROVIDERS[source];

    if (cached.timeout && Date.now() < cached.timeout) {
      Toast.create({
        html: `Fetched from cache: <b>${provider.title}</b>`,
        image: provider.icon,
        bgColor: '#ffa000',
      });
      return;
    }

    fetch(API + source)
      .then(response => response.json())
      .then((json) => {
        json.timeout = (json.updated_at + provider.timeout) * 1000;
        json.fetched = Date.now();

        commit('updateCache', json);
        Toast.create({
          html: `Rates from <b>${provider.title}</b> have been updated`,
          image: provider.icon,
          bgColor: '#29b6f6',
        });
      });
  },
};
