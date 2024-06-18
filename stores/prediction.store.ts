import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";

export type Prediction = {
  balanceCash: number;
  balance: number;
  balanceWithUnpaidTax: number;
};

export const usePredictionsStore = defineStore("predictions", () => {
  const accountStore = useAccountStore();
  const transactionStore = useTransactionStore();
  const taxesStore = useTaxesStore();
  const predictionStartMonth = accountStore.doneMonth;

  const predictions = computed((): Prediction[] => {
    if (
      accountStore.accounts.length === 0 ||
      transactionStore.monthlyDifference.length === 0
    ) {
      return [];
    }

    let balance = 0;
    let balanceWithUnpaidTax = balance; // rename to balanceWithPaid or UnpaidTaxes
    let balanceCash = 0;
    let currentInvestments =
      accountStore.totalRestrictedFunds[predictionStartMonth];

    return transactionStore.monthlyDifference.map((difference, index) => {
      if (index < predictionStartMonth) {
        balanceWithUnpaidTax = accountStore.monthlyTotalBalances[index];
        balance =
          balanceWithUnpaidTax -
          taxesStore.expectedTaxes[index] +
          taxesStore.paidTaxes[index];
        balanceCash = balance - currentInvestments;
      } else {
        balanceWithUnpaidTax += difference;
        balance +=
          difference -
          taxesStore.expectedTaxes[index] +
          taxesStore.paidTaxes[index];
      }

      balanceCash = balance - currentInvestments;
      return { balanceCash, balance, balanceWithUnpaidTax };
    });
  });

  return { predictions };
});
