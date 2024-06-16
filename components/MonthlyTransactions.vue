<script setup lang="ts">
import { calculateMonthlyTotal } from "../utils/index";

const props = defineProps<{
  title: string;
  transactions: Transaction[];
  yearlyTotal: number;
  doneMonth: number;
}>();

const emit = defineEmits<{
  (e: "addTransaction", transaction: Transaction): void;
}>();
</script>
<template>
  <div>
    <h2 class="text-lg">{{ props.title }}</h2>
    <div class="m-0 grid grid-cols-13 gap-4 mb-8">
      <div></div>
      <MonthData
        v-for="(month, idx) in months"
        :key="month"
        :title="month"
        :month="idx"
        :transactions="transactions[idx]"
        :monthDone="props.doneMonth"
        @add-transaction="emit('addTransaction', $event)"
        class="mb-4"
      />
      <p class="font-semibold">Total</p>
      <p v-for="(month, idx) in months" :key="month">
        {{ calculateMonthlyTotal(transactions[idx]) }}
      </p>
    </div>
    <p>Total: {{ yearlyTotal }}</p>
  </div>
</template>
