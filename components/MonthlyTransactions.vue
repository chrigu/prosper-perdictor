<script setup lang="ts">
import { calculateMonthlyTotal } from "../utils/index";

const props = defineProps<{
  title: string;
  transactions: Transaction[];
  yearlyTotal: number;
}>();

const emit = defineEmits<{
  (e: "addTransaction", transaction: Transaction): void;
}>();
</script>
<template>
  <h2>{{ props.title }}</h2>
  <div class="m-0 grid grid-cols-13 gap-4">
    <div></div>
    <MonthData
      v-for="(month, idx) in months"
      :key="month"
      :title="month"
      :month="idx"
      :transactions="transactions[idx]"
      @add-transaction="emit('addTransaction', $event)"
    />
    <div>Total</div>
    <p v-for="(month, idx) in months" :key="month">
      {{ calculateMonthlyTotal(transactions[idx]) }}
    </p>
  </div>
  <p>Yearly total: {{ yearlyTotal }}</p>
</template>
