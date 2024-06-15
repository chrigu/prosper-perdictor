import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

type State = {
  expected: number[];
  paid: number[];
};

export const useTaxesStore = defineStore("taxes", () => {
  const taxes = useStorage(
    "prosperPerdictor-taxes",
    {
      expected: Array.from({ length: 12 }, () => 0),
      paid: Array.from({ length: 12 }, () => 0),
    },
    localStorage,
    { mergeDefaults: true },
  ) as any as Ref<State>;

  const expectedTaxes = computed(() => taxes.value.expected);
  const paidTaxes = computed(() => taxes.value.paid);

  function updateExpectedTaxes(month: number, amount: number) {
    taxes.value.expected[month] = amount;
  }

  function updatePaidTaxes(month: number, amount: number) {
    taxes.value.paid[month] = amount;
  }

  function setTaxes(newExpectedTaxes: number[], newPaidTaxes: number[]) {
    taxes.value.expected = newExpectedTaxes;
    taxes.value.paid = newPaidTaxes;
  }

  function exportTaxes() {
    return {
      expectedTaxes: expectedTaxes.value,
      paidTaxes: paidTaxes.value,
    };
  }

  return {
    expectedTaxes,
    paidTaxes,
    updateExpectedTaxes,
    updatePaidTaxes,
    setTaxes,
    exportTaxes,
  };
});
