import Vue from 'vue';
import Quasar from 'quasar';
import Vuex from 'vuex';

import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

import storeData from './store';
import storage from './storage';
import App from './App';

// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// eslint-disable-next-line import/no-dynamic-require
require(`quasar/dist/quasar.${__THEME}.css`);
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Quasar); // Install Quasar Framework

const store = new Vuex.Store(storeData);
store.dispatch('updateSourceRates');

function onStorageChanged(state) {
  storage.save(state);
}

store.watch(
  ({
    cache, source, rows, fromColumns,
  }) => ({
    cache, source, rows, fromColumns,
  }),
  onStorageChanged,
);

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    render: h => h(App),
  });
});
