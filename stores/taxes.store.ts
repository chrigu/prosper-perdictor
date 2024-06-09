import { defineStore } from "pinia";

export const useTaxesStore = defineStore("taxes", () => {
  const expectedTaxes = ref<number[]>(Array.from({ length: 12 }, () => 0));
  const paidTaxes = ref<number[]>(Array.from({ length: 12 }, () => 0));

  function updateExpectedTaxes(month: number, amount: number) {
    expectedTaxes.value[month] = amount;
  }

  function updatePaidTaxes(month: number, amount: number) {
    paidTaxes.value[month] = amount;
  }

  return { expectedTaxes, paidTaxes, updateExpectedTaxes, updatePaidTaxes };
});
