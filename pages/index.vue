<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import MonthData from "/components/MonthData.vue";
import { months } from "../utils/index";
import { calculateMonthlyTotal } from "../utils/index";

const transactionStore = useTransactionStore();
const accountStore = useAccountStore();
</script>
<template>
  <div>
    <!-- This page correctly has only one single root element -->
    <h1>Finance</h1>
    <Accordion :multiple="true" :activeIndex="[0, 1]">
      <AccordionTab header="Outlook">
        <h2>Income</h2>
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
        <h2>Expenditures</h2>
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
        <p>Yearly: {{ transactionStore.yearlyExpenditure }}</p>
        <div class="m-0 grid grid-cols-13 gap-4">
          <div></div>
          <p v-for="(_month, idx) in months" :key="idx">
            Diff:
            {{ transactionStore.monthlyDifference[idx] }}
          </p>
        </div>
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
