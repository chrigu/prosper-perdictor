import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";

export const usePredictionsStore = defineStore("predictions", () => {
  const accountStore = useAccountStore();
  const transactionStore = useTransactionStore();
  const taxesStore = useTaxesStore();

  const predictions = computed(() => {
    if (
      accountStore.accounts.length === 0 ||
      transactionStore.monthlyDifference.length === 0
    ) {
      return [];
    }

    let balance = accountStore.monthlyTotalBalances[0];
    return transactionStore.monthlyDifference.map((difference, index) => {
      balance +=
        difference -
        taxesStore.expectedTaxes[index] +
        taxesStore.paidTaxes[index];
      return balance;
    });
  });

  return { predictions };
});
