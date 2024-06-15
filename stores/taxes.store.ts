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

  function setTaxes(newTaxes: State) {
    taxes.value.expected = newTaxes.expected;
    taxes.value.paid = newTaxes.paid;
  }

  return {
    taxes,
    expectedTaxes,
    paidTaxes,
    updateExpectedTaxes,
    updatePaidTaxes,
    setTaxes,
  };
});
