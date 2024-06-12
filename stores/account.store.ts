import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("accounts", () => {
  const accounts = ref<Account[]>([]);

  const monthlyTotalBalances = computed(() =>
    sumColumns(accounts.value.map((account) => account.balances)),
  );

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

  function exportAccounts() {
    return accounts.value;
  }

  return { accounts, addAccount, monthlyTotalBalances, setAccounts, exportAccounts };
});
