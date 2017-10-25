<template lang="pug">
  .wrap
    q-toolbar
      q-btn(icon='clear' small round flat @click='close')
      q-toolbar-title Edit Amount
      q-btn(icon='done' small round flat @click='close')
    .editing
      q-input(
        ref="inputAmount"
        v-model.number="editingAmount"
        type="number"
        placeholder='Amount'
        :after=`[
          {
            icon: 'cancel',
            content: true,
            handler: clear,
          },
        ]`
      )
</template>

<script>
import { QToolbar, QToolbarTitle, QBtn, QInput } from 'quasar'
import _ from 'lodash'

export default {
  components: { QToolbar, QToolbarTitle, QBtn, QInput },
  methods: {
    close() {
      this.$emit('commitAction', {action: 'editColumnAmount'})
    },
  }
}

/*
        :stack-label='curr.currencyName'
        @keyup.enter='apply'
        @keyup.esc='cancel'
        :prefix='unit'
*/
</script>

<style lang="scss">
</style>
