import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAccountStore = defineStore("accounts", () => {
  const state = useStorage(
    "prosperPerdictor-accounts",
    {
      accounts: [],
      doneMonth: -1,
    },
    localStorage,
    {
      mergeDefaults: true,
    },
  ) as any as Ref<{ accounts: Account[]; doneMonth: number }>;

  const accounts = computed(() => state.value.accounts);
  const doneMonth = computed(() => state.value.doneMonth);

  const monthlyTotalBalances = computed(() =>
    sumColumns(accounts.value.map((account) => account.balances)),
  );

  const monthlyTotalInvestments = computed(() => {
    return sumColumns(
      accounts.value
        .filter(
          (account) =>
            account.type === "investments" || account.type === "pension",
        )
        .map((investmentAccount) => investmentAccount.balances),
    );
  });

  function addAccount(name: string, type: AccountType) {
    state.value.accounts.push({
      name,
      balances: Array.from({ length: 12 }, () => 0),
      type,
    });
  }

  function setDoneMonth(newDoneMonth: number) {
    state.value.doneMonth = newDoneMonth;
  }

  function setAccounts(newAccounts: Account[]) {
    state.value.accounts = newAccounts;
  }

  return {
    accounts,
    doneMonth,
    addAccount,
    monthlyTotalBalances,
    setAccounts,
    monthlyTotalInvestments,
    setDoneMonth,
  };
});
