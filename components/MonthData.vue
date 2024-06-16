<script setup lang="ts">
import type { Month, Transaction } from "/types/types.d.ts";
import InputNumber from "primevue/inputnumber";

const props = defineProps<{
  title: string;
  month: Month;
  transactions: Transaction[];
  monthDone: number;
}>();

const emit = defineEmits<{
  (e: "addTransaction", transaction: Transaction): void;
}>();

const newAmount = ref<number>(0);

function updateAmount(value: number) {
  newAmount.value = value;
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
    <h3 class="font-semibold mb-4">{{ props.title }}</h3>
    <ul>
      <li v-for="(transaction, i) in props.transactions" class="my-4">
        <InputNumber
          v-model="transaction.amount"
          :inputId="`transaction-${i}`"
          :disabled="props.monthDone > props.month"
          pt:input:root:style="width: 80px;"
        />
      </li>
    </ul>
    <InputNumber
      v-model="newAmount"
      v-if="props.monthDone <= props.month"
      @input="updateAmount($event.value)"
      @keyup.enter="addTransaction()"
      pt:input:root:style="width: 80px;"
    />
  </div>
</template>
