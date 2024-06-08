<script setup lang="ts">
import type { Month, Transaction } from "/types/types.d.ts";
import Button from "primevue/button";

const props = defineProps<{
  title: string;
  month: Month;
  transactions: Transaction[];
}>();

const emit = defineEmits<{
  (e: "addTransaction", transaction: Transaction): void;
}>();

const newAmount = ref<number>(0);

const displayAmount = computed(() => {
  return newAmount.value === 0 ? "" : newAmount.value;
});

function updateAmount(value: string) {
  newAmount.value = value === "" ? 0 : Number(value);
}

function addTransaction() {
  emit("addTransaction", {
    month: props.month,
    title: "foo",
    amount: Number(newAmount.value),
  });
  newAmount.value = 0;
}
</script>

<template>
  <div>
    <h4 class="text-lg font-semiboldx">{{ props.title }}</h4>
    <ul>
      <li v-for="transaction in props.transactions">
        <input :value="transaction.amount" />
      </li>
    </ul>
    <input
      type="number"
      class="w-20"
      :value="displayAmount"
      @input="updateAmount($event.target.value)"
      @keyup.enter="addTransaction()"
    />
  </div>
</template>
