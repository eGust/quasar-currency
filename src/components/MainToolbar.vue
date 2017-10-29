<template lang="pug">
  q-toolbar(color='yellow')
    q-toolbar-title.dark-text eCurrency v2.0.0
    q-select(
      stack-label="Source" 
      @change='changeSource'
      :value='source' 
      :options=`providerList`
    )
</template>

<script>
import { QToolbar, QToolbarTitle, QSelect } from 'quasar'
import provider from '../store/providers'
import _ from 'lodash'

const PROVIDER_OPTIONS = _.map(provider, ({ key, title, icon }) => ({ label: title, value: key, image: icon }))

export default {
  components: { QToolbar, QToolbarTitle, QSelect },
  props: [ 'source' ],
  computed: {
    providerList: () => PROVIDER_OPTIONS,
  },
  methods: {
    changeSource(source) {
      this.$emit('updateSourceRates', source)
    },
  },
}
</script>

<style lang="scss">
.dark-text {
  color: #444;
}
.q-item > .q-item-image {
  min-width: 20px;
  max-width: 20px;
  max-height: 20px;
}
</style>
