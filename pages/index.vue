<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import MonthData from "/components/MonthData.vue";

const transactionStore = useTransactionStore();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function calculateMonthlyTotal(transactions: Transaction[]) {
  const some = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );
  return some;
}
</script>
<template>
  <div>
    <!-- This page correctly has only one single root element -->
    <h1>Finance</h1>
    <Accordion :multiple="true" :activeIndex="[0]">
      <AccordionTab header="Income">
        <div class="m-0 grid grid-cols-12 gap-4">
          <MonthData
            v-for="(month, idx) in months"
            :key="month"
            :title="month"
            :month="idx"
            :transactions="transactionStore.incomes[idx]"
            @add-transaction="transactionStore.addIncome"
          />
          <p v-for="(month, idx) in months" :key="month">
            Monthly: {{ calculateMonthlyTotal(transactionStore.incomes[idx]) }}
          </p>
        </div>
        <p>Yearly total: {{ transactionStore.yearlyIncome }}</p>
      </AccordionTab>
      <AccordionTab header="Expenditure">
        <div class="m-0 grid grid-cols-12 gap-4">
          <MonthData
            v-for="(month, idx) in months"
            :key="month"
            :title="month"
            :month="idx"
            :transactions="transactionStore.expenditures[idx]"
            @add-transaction="transactionStore.addExpenditure"
          />
          <p v-for="(month, idx) in months" :key="month">
            Monthly:
            {{ calculateMonthlyTotal(transactionStore.expenditures[idx]) }}
          </p>
        </div>
        <p>Sum: {{ transactionStore.yearlyExpenditure }}</p>
      </AccordionTab>
      <AccordionTab header="Accounts">
        <p class="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus.
        </p>
      </AccordionTab>
    </Accordion>
  </div>
</template>
