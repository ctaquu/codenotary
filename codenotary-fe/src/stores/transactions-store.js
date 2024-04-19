import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    list: [],
    drawerOpen: false,
    newTransaction: {
      account_name: null,
      account_number: null,
      IBAN: null,
      address: null,
      amount: null,
      type: null,
    },
  }),
  getters: {
    getList: (state) => state.list,
    getDrawerOpen: (state) => state.drawerOpen,
  },
  actions: {
    async fetchTransactions() {
      try {
        // load data from the API
        await api.get('transactions').then((response) => {
          this.list = response.data
        })
        return true
      } catch (e) {
        e.response.data.message.forEach((element) => {
          Notify.create({
            message: element,
            color: 'negative',
          })
        })
        return e
      }
    },
    async createTransactions(payload) {
      try {
        // save data to the API
        await api.post('transactions', payload)
        Notify.create({
          message: 'Transaction created successfully',
          color: 'positive',
        })
        // load data up-to-date data from the API
        return true
      } catch (e) {
        e.response.data.message.forEach((element) => {
          Notify.create({
            message: element,
            color: 'negative',
          })
        })
        return false
      }
    },
    resetNewTransaction() {
      this.newTransaction = {
        account_name: null,
        account_number: null,
        IBAN: null,
        address: null,
        amount: null,
        type: null,
      }
    },
  },
})
