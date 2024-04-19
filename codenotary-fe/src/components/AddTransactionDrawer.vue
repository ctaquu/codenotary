<template lang="pug">
q-drawer(
  v-if="transactionsStore.drawerOpen"
  side="right"
  v-model="transactionsStore.drawerOpen"
  show-if-above
  bordered
  :width="300"
  :breakpoint="500"
)
  q-scroll-area.fit
    .q-pa-sm
      .text-h6 Adding new transaction
      q-separator
      q-form(@submit="handleAddTransaction")
        q-input.q-mt-sm(
          v-model="transactionsStore.newTransaction.account_name"
          label="Account Name"
          outlined
          dense
          :rules="[val => !!val || 'Field is required']"
        )
        q-input.q-mt-sm(
          v-model="transactionsStore.newTransaction.account_number"
          label="Account Number"
          outlined
          type="number"
          dense
          :rules="[val => !!val || 'Field is required']"
        )
        q-input.q-mt-sm(
          v-model="transactionsStore.newTransaction.IBAN"
          label="IBAN"
          :rules="[val => !!val, val => ibanValidator(val) || 'Field is required']"
          outlined
          dense
        )
        q-input.q-mt-sm(
          v-model="transactionsStore.newTransaction.address"
          label="Address"
          :rules="[val => !!val || 'Field is required']"
          autogrow
          outlined
          dense
        )
        q-input.q-mt-sm(
          v-model="transactionsStore.newTransaction.amount"
          label="Amount(€)"
          type="number"
          :rules="[val => !!val || 'Field is required']"
          outlined
          dense
        )
        q-select.q-mt-sm(
          v-model="transactionsStore.newTransaction.type"
          label="Type"
          :options="[ { value: 'sending', label: 'Sending' }, { value: 'receiving', label: 'Receiving' } ]"
          :rules="[val => !!val || 'Field is required']"
          outlined
          dense
        )
        q-separator
        q-btn.q-mt-sm.q-mr-sm(
          color="primary"
          label="Add"
          type="submit"
        )
        q-btn.q-mt-sm(
          label="Cancel"
          @click="handleCloseDrawer"
        )
</template>

<script setup>
import { useTransactionsStore } from 'stores/transactions-store'
import { ibanValidator } from 'src/utils/misc'

defineOptions({
  name: 'AddTransactionDrawer',
})

const transactionsStore = useTransactionsStore()

const handleCloseDrawer = () => {
  transactionsStore.drawerOpen = false
}

const handleAddTransaction = async () => {
  const res = await transactionsStore.createTransactions({
    ...transactionsStore.newTransaction,
    account_number: Number(transactionsStore.newTransaction.account_number),
    amount: Number(transactionsStore.newTransaction.amount),
    type: transactionsStore.newTransaction.type.value,
  })
  if (res) {
    await transactionsStore.fetchTransactions()
    transactionsStore.resetNewTransaction()
    handleCloseDrawer()
  }
}
</script>
