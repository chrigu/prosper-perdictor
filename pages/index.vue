<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import MonthData from "/components/MonthData.vue";
import { months } from "../utils/index";

const transactionStore = useTransactionStore();
const accountStore = useAccountStore();

function calculateMonthlyTotal(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
}
</script>
<template>
  <div>
    <!-- This page correctly has only one single root element -->
    <h1>Finance</h1>
    <Accordion :multiple="true" :activeIndex="[2]">
      <AccordionTab header="Income">
        <div class="m-0 grid grid-cols-13 gap-4">
          <div></div>
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
        <div class="m-0 grid grid-cols-13 gap-4">
          <div></div>
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
        <Accounts
          :accounts="accountStore.accounts"
          @add-account="accountStore.addAccount"
        />
      </AccordionTab>
    </Accordion>
  </div>
</template>
