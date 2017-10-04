<template lang="pug">
  .currency
    i.icon.flag(:class='"flag-" + currency')
    .name {{ currency }}
</template>

<script>
require('../assets/flags.scss')

export default {
  props: ['currency'],
}
</script>

<style lang="scss">
.currency {
  .name {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
