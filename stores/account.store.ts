import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("accounts", () => {
  const accounts = ref<Account[]>([]);

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
    accounts.value.push({
      name,
      balances: Array.from({ length: 12 }, () => 0),
      type,
    });
  }

  function setAccounts(newAccounts: Account[]) {
    accounts.value = newAccounts;
  }

  return {
    accounts,
    addAccount,
    monthlyTotalBalances,
    setAccounts,
    monthlyTotalInvestments,
  };
});
