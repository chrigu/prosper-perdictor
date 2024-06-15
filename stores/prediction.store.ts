import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";

export type Prediction = {
  balanceCash: number;
  balance: number;
  balanceWithTax: number;
};

export const usePredictionsStore = defineStore("predictions", () => {
  const predictionStartMonth = ref(0);
  const accountStore = useAccountStore();
  const transactionStore = useTransactionStore();
  const taxesStore = useTaxesStore();

  const predictions = computed((): Prediction[] => {
    if (
      accountStore.accounts.length === 0 ||
      transactionStore.monthlyDifference.length === 0
    ) {
      return [];
    }

    let balance = accountStore.monthlyTotalBalances[predictionStartMonth.value];
    let balanceWithTax = balance; // rename to balanceWithPaid or UnpaidTaxes
    let currentInvestments =
      accountStore.monthlyTotalInvestments[predictionStartMonth.value];
    let balanceCash = 0;

    return transactionStore.monthlyDifference.map((difference, index) => {
      balanceWithTax += difference;
      balance +=
        difference -
        taxesStore.expectedTaxes[index] +
        taxesStore.paidTaxes[index];
      balanceCash = balance - currentInvestments;
      return { balanceCash, balance, balanceWithTax };
    });
  });

  return { predictions };
});
