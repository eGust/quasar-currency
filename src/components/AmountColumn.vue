<template lang="pug">
  .column-amount
    .editing(v-if='isEditing')
      input(type="number" v-model="amount")
    .display(v-else)
      .amount {{ amount }}
      .rate(v-if='!isSource') (Rate = {{ rate }})
</template>

<script>
export default {
  props: ['isSource', 'isEditing', 'rate', 'amount'],
}
</script>

<style lang="scss"></style>
