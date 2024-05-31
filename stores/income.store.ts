import type { Month, Income } from '../types/types'
import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useIncomeStore = defineStore('income', () => {
  const incomes = ref<Income[][]>(Array.from({ length: 12 }, () => []))

  function addIncome(income: Income) {
    incomes.value[income.month - 1].push(income)
  }

  return { incomes, addIncome }
})