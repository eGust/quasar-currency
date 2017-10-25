import store from 'store/dist/store.modern'

const STORE_KEY = 'currency.storage'

export default {
  load() {
    return store.get(STORE_KEY)
  },
  save: function (value) {
    store.set(STORE_KEY, value)
  },
}
