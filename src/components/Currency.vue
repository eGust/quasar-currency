<template lang="pug">
  .currency
    i.icon.flag(:class='"flag-" + currency')
    .name {{ currency }}
</template>

<script>
export default {
  props: ['currency'],
}
</script>

<style lang="scss"></style>
