<template lang="pug">
  q-toolbar(color='yellow')
    q-toolbar-title.dark-text Currency
    q-select(stack-label="Source" :options='providerList' :value='source' @change='changeSource')
</template>

<script>
import { QToolbar, QToolbarTitle, QSelect } from 'quasar'
import provider from '../store/providers'
import _ from 'lodash'

const PROVIDER_OPTIONS = _.map(provider, ({ key, title }) => ({ label: title, value: key }))

export default {
  components: { QToolbar, QToolbarTitle, QSelect },
  props: [ 'source' ],
  computed: {
    providerList: () => PROVIDER_OPTIONS,
  },
  methods: {
    changeSource: function (source) {
      this.$emit('updateSourceRates', source)
    },
  },
}
</script>

<style lang="scss">
.dark-text {
  color: #444;
}
</style>
