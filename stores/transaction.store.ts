import type { Transaction } from "../types";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

type State = {
  incomes: Transaction[][];
  expenditures: Transaction[][];
};

export const useTransactionStore = defineStore("transactions", () => {
  const transcations = useStorage(
    "prosperPerdictor-transactions",
    {
      incomes: Array.from({ length: 12 }, () => []),
      expenditures: Array.from({ length: 12 }, () => []),
    },
    localStorage,
    { mergeDefaults: true },
  ) as any as Ref<State>;

  const incomes = computed(() => transcations.value.incomes);
  const expenditures = computed(() => transcations.value.expenditures);

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
    addTransaction(income, transcations.value.incomes);
  }

  function addExpenditure(expenditure: Transaction) {
    addTransaction(expenditure, transcations.value.expenditures);
  }

  function addTransaction(
    transaction: Transaction,
    transactions: Transaction[][],
  ) {
    transactions[transaction.month].push(transaction);
  }

  function yearlyTotal(transactions: Ref<Transaction[][]>) {
    return transactions.value
      .flat()
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  function setIncomes(newIncomes: Transaction[][]) {
    transcations.value.incomes = newIncomes;
  }

  function setExpenditures(newExpenditures: Transaction[][]) {
    transcations.value.expenditures = newExpenditures;
  }

  function setTransactions(newTransactions: State) {
    transcations.value.incomes = newTransactions.incomes;
    transcations.value.expenditures = newTransactions.expenditures;
  }

  function exportTransactions() {
    return {
      incomes: incomes.value,
      expenditures: expenditures.value,
    };
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
    exportTransactions,
    setTransactions,
  };
});
