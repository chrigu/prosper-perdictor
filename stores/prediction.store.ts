import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";

export type Prediction = {
  balanceCash: number;
  balance: number;
  balanceWithTax: number;
};

export const usePredictionsStore = defineStore("predictions", () => {
  const accountStore = useAccountStore();
  const transactionStore = useTransactionStore();
  const taxesStore = useTaxesStore();

  const startMonth = 0;

  const predictions = computed((): Predictions[] => {
    if (
      accountStore.accounts.length === 0 ||
      transactionStore.monthlyDifference.length === 0
    ) {
      return [];
    }

    let balance = accountStore.monthlyTotalBalances[startMonth]; // todo: start at defined month
    let balanceWithTax = balance; // rename to balanceWithPaid or UnpaidTaxes
    let currentSavings = getSavings(accountStore.accounts, startMonth);
    let balanceCash = 0;

    return transactionStore.monthlyDifference.map((difference, index) => {
      balanceWithTax += difference;
      balance +=
        difference -
        taxesStore.expectedTaxes[index] +
        taxesStore.paidTaxes[index];
      balanceCash = balance - currentSavings;
      return { balanceCash, balance, balanceWithTax };
    });
  });

  // hacky
  function getSavings(accounts: Account[], month: number) {
    let savingsAccounts = accounts.filter(
      (account) => account.type === "investments" || account.type === "pension",
    );
    return savingsAccounts.reduce(
      (acc, account) => acc + account.balances[month],
      0,
    );
  }

  return { predictions };
});
