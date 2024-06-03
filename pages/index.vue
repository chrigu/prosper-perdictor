<script setup lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import MonthData from "/components/MonthData.vue";
import { months } from "../utils/index";

const transactionStore = useTransactionStore();
const accountStore = useAccountStore();

const visible = ref(false);
const selectedAccountType: Ref<AccountType> = ref("cash");
const accountName = ref("");
const accountTypes: { type: AccountType; label: string }[] = [
  { type: "cash", label: "Cash" },
  { type: "investment", label: "Investment" },
  { type: "pension", label: "Pension" },
];

function calculateMonthlyTotal(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
}

function addAccount() {
  accountStore.addAccount(accountName.value, selectedAccountType.value.type);
  selectedAccountType.value = accountTypes[0];
  accountName.value = "";
  visible.value = false;
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
        <div v-for="account in accountStore.accounts" :key="account.name">
          <div class="m-0 grid grid-cols-13 gap-4">
            account {{ account.name }}
            <p>Account type: {{ account.type }}</p>
            <p v-for="balance in account.balances">
              {{ balance }}
            </p>
          </div>
        </div>
        <Button label="Add account" @click="visible = true" />
      </AccordionTab>
    </Accordion>
  </div>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add account"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-600 dark:text-surface-0/70 block mb-5"
      >Update your information.</span
    >
    <div class="flex items-center gap-3 mb-3">
      <label for="name" class="font-semibold w-[6rem]">Name</label>
      <InputText
        id="name"
        class="flex-auto"
        autocomplete="off"
        v-model="accountName"
      />
    </div>
    <div class="flex items-center gap-3 mb-5">
      <label for="label" class="font-semibold w-[6rem]">Account Type</label>
      <Dropdown
        v-model="selectedAccountType"
        :options="accountTypes"
        optionLabel="label"
        placeholder="Select an account type"
        class="w-full md:w-[14rem]"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button type="button" label="Save" @click="addAccount()"></Button>
    </div>
  </Dialog>
</template>
