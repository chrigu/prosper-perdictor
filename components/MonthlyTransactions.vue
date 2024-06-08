<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import MonthData from "/components/MonthData.vue";
import { months } from "../utils/index";
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
