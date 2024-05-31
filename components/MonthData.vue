
import type { ProgressSpinner } from '#build/components';

import type { ProgressSpinner } from '#build/components';

import type datatable from '~/presets/aura/datatable';
<script setup lang="ts">
import type { Month, Income } from '/types/types.d.ts';
import Button from 'primevue/button';

const props = defineProps<{
  title: string;
  month: Month;
  incomes: Income[];
}>();

const emit = defineEmits<{
  (e: "addIncome", income: Income): void;
}>();

const sum = computed(() => {
  return props.incomes.reduce((acc, income) => acc + income.amount, 0);
});

const newAmount = ref<number>(0);

const displayAmount = computed(() => {
  return newAmount.value === 0 ? '' : newAmount.value;
});

function updateAmount(value) {
  newAmount.value = value === '' ? 0 : Number(value);
}

function addIncome() {
  emit('addIncome', { month: props.month, title: 'foo', amount: Number(newAmount.value) });
  newAmount.value = 0;
};

</script>

<template>
  <div>
    <h4 class="text-lg font-semiboldx">{{ props.title }}</h4>
    <ul>
      <li v-for="income in props.incomes">
        <input :value="income.amount" />
      </li>
    </ul>
    <input type="number" :value="displayAmount" @input="updateAmount($event.target.value)" @keyup.enter="addIncome()" />
    <p>Sum {{ sum }}</p>
  </div>
</template>
