import type { Account, AccountType } from "../types";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("accounts", () => {
  const accounts = ref<Account[]>([]);

  function addAccount(name: string, type: AccountType) {
    accounts.value.push({
      name,
      balances: Array.from({ length: 12 }, () => 0),
      type,
    });
  }

  return { accounts, addAccount };
});
