<template lang="pug">
q-page.flex.q-pa-sm
  TransactionList.full-width.q-mt-md
</template>

<script setup>
import TransactionList from 'components/TransactionList.vue'

defineOptions({
  name: 'IndexPage',
})
</script>
