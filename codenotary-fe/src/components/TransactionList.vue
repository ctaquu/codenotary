<template lang="pug">
div
  q-btn.q-mb-sm(
    color="primary"
    label="Add new transaction"
    @click="transactionsStore.drawerOpen = true"
  )
  q-table(
    v-if="transactionsStore.list"
    title="Transactions"
    :rows="transactionsStore.list"
    :columns="columns"
    row-key="name"
    :pagination="initialPagination"
  )
  TableSkeleton(v-else)
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { date } from 'quasar'
import { useTransactionsStore } from 'stores/transactions-store'
import TableSkeleton from 'components/TableSkeleton.vue'

defineOptions({
  name: 'TransactionList',
})

const columns = [
  {
    name: 'account_name',
    label: 'Account Name',
    field: 'account_name',
    sortable: true,
    align: 'left',
  },
  {
    name: 'account_number',
    label: 'Account Number',
    field: 'account_number',
    sortable: true,
    align: 'left',
  },
  { name: 'IBAN', label: 'IBAN', field: 'IBAN', sortable: true, align: 'left' },
  {
    name: 'address',
    label: 'Address',
    field: 'address',
    sortable: true,
    align: 'left',
  },
  {
    name: 'amount',
    label: 'Amount(€)',
    field: 'amount',
    sortable: true,
    align: 'left',
  },
  { name: 'type', label: 'Type', field: 'type', sortable: true, align: 'left' },
  {
    name: 'time_created',
    label: 'Time Created',
    field: (row) =>
      date.formatDate(new Date(row.time_created * 1000), 'YYYY-MM-DD HH:mm:ss'),
    sortable: true,
    align: 'left',
  },
]
const drawerOpen = ref(true)
const transactionsStore = useTransactionsStore()
const initialPagination = {
  sortBy: 'time_created',
  descending: true,
  rowsPerPage: 50,
}

onBeforeMount(async () => {
  // fetch data from the API
  await transactionsStore.fetchTransactions()
})
</script>
