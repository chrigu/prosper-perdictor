<script setup lang="ts">
const transactionStore = useTransactionStore();
</script>
<template>
  <MonthlyTransactions
    title="Income"
    :transactions="transactionStore.incomes"
    :yearlyTotal="transactionStore.yearlyIncome"
    @add-transaction="transactionStore.addIncome"
  />
  <MonthlyTransactions
    title="Expenditures"
    :transactions="transactionStore.expenditures"
    :yearlyTotal="transactionStore.yearlyExpenditure"
    @add-transaction="transactionStore.addExpenditure"
  />
  <div class="m-0 grid grid-cols-13 gap-4">
    <div></div>
    <p v-for="(_month, idx) in months" :key="idx">
      Diff:
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
