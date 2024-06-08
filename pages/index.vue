<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { months } from "../utils/index";

const transactionStore = useTransactionStore();
const accountStore = useAccountStore();

function addDemoData() {
  transactionStore.setIncomes([
    [{ month: 0, description: "Salary", amount: 1000 }],
    [{ month: 1, description: "Salary", amount: 1000 }],
    [{ month: 2, description: "Salary", amount: 1000 }],
    [{ month: 3, description: "Salary", amount: 1000 }],
    [{ month: 4, description: "Salary", amount: 1000 }],
    [{ month: 5, description: "Salary", amount: 1000 }],
    [{ month: 6, description: "Salary", amount: 1000 }],
    [{ month: 7, description: "Salary", amount: 1000 }],
    [{ month: 8, description: "Salary", amount: 1000 }],
    [{ month: 9, description: "Salary", amount: 1000 }],
    [{ month: 10, description: "Salary", amount: 1000 }],
    [{ month: 11, description: "Salary", amount: 1000 }],
  ]);

  transactionStore.setExpenditures([
    [{ month: 0, description: "Rent", amount: 400 }],
    [{ month: 1, description: "Rent", amount: 400 }],
    [{ month: 2, description: "Rent", amount: 400 }],
    [{ month: 3, description: "Rent", amount: 400 }],
    [{ month: 4, description: "Rent", amount: 400 }],
    [{ month: 5, description: "Rent", amount: 400 }],
    [{ month: 6, description: "Rent", amount: 400 }],
    [{ month: 7, description: "Rent", amount: 400 }],
    [{ month: 8, description: "Rent", amount: 400 }],
    [{ month: 9, description: "Rent", amount: 400 }],
    [{ month: 10, description: "Rent", amount: 400 }],
    [{ month: 11, description: "Rent", amount: 400 }],
  ]);
}
</script>
<template>
  <div>
    <Button label="Demo data" @click="addDemoData()" />
    <h1>Finance</h1>
    <Accordion :multiple="true" :activeIndex="[0, 1]">
      <AccordionTab header="Outlook">
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
