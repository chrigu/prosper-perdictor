import type { Transaction } from "../types";
import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTransactionStore = defineStore("income", () => {
  const incomes = ref<Transaction[][]>(Array.from({ length: 12 }, () => []));
  const expenditures = ref<Transaction[][]>(
    Array.from({ length: 12 }, () => []),
  );

  const monthlyDifference = computed(() => {
    const monthlyIncomes = incomes.value.map((monthlyIncomes) =>
      calculateMonthlyTotal(monthlyIncomes),
    );
    const monthlyExpenditures = expenditures.value.map((monthlyExpenditures) =>
      calculateMonthlyTotal(monthlyExpenditures),
    );

    return monthlyIncomes.map(
      (income, index) => income - monthlyExpenditures[index],
    );
  });

  const yearlyIncome = computed(() => yearlyTotal(incomes));
  const yearlyExpenditure = computed(() => yearlyTotal(expenditures));

  function addIncome(income: Transaction) {
    addTransaction(income, incomes);
  }

  function addExpenditure(expenditure: Transaction) {
    addTransaction(expenditure, expenditures);
  }

  function addTransaction(
    transaction: Transaction,
    transactions: Ref<Transaction[][]>,
  ) {
    transactions.value[transaction.month].push(transaction);
  }

  function yearlyTotal(transactions: Ref<Transaction[][]>) {
    return transactions.value
      .flat()
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  function setIncomes(newIncomes: Transaction[][]) {
    incomes.value = newIncomes;
  }

  function setExpenditures(newExpenditures: Transaction[][]) {
    expenditures.value = newExpenditures;
  }

  return {
    incomes,
    expenditures,
    addIncome,
    yearlyIncome,
    yearlyExpenditure,
    addExpenditure,
    monthlyDifference,
    setIncomes,
    setExpenditures,
  };
});
