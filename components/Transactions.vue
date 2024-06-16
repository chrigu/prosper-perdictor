<script setup lang="ts">
const transactionStore = useTransactionStore();
const accountStore = useAccountStore();
</script>
<template>
  <MonthlyTransactions
    title="Income"
    :transactions="transactionStore.incomes"
    :yearlyTotal="transactionStore.yearlyIncome"
    :done-month="accountStore.doneMonth"
    @add-transaction="transactionStore.addIncome"
    class="mb-8"
  />
  <MonthlyTransactions
    title="Expenditures"
    :transactions="transactionStore.expenditures"
    :yearlyTotal="transactionStore.yearlyExpenditure"
    :done-month="accountStore.doneMonth"
    @add-transaction="transactionStore.addExpenditure"
    class="mb-8"
  />
  <div class="m-0 grid grid-cols-13 gap-4 mb-8">
    <p>&Delta;</p>
    <p v-for="(_month, idx) in months" :key="idx">
      {{ transactionStore.monthlyDifference[idx] }}
    </p>
  </div>
  <ToggleContent :content-name="'chart'">
    <ChartsBarChart
      :labels="months"
      :data="transactionStore.monthlyDifference"
    />
  </ToggleContent>
</template>
