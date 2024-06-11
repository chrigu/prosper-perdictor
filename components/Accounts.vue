<script setup lang="ts">
import type { Account, AccountType } from "../types/index";
import Button from "primevue/button";

const accountStore = useAccountStore();

const emit = defineEmits<{
  (e: "addAccount", account: Account): void;
}>();

const visible = ref(false);
const accountName = ref("");
const accountTypes: { type: AccountType; label: string }[] = [
  { type: "cash", label: "Cash" },
  { type: "investments", label: "Investment" },
  { type: "pension", label: "Pension" },
];
const selectedAccountType: Ref<{ type: AccountType; label: string }> = ref(
  accountTypes[0],
);

function addAccount() {
  accountStore.addAccount(accountName.value, selectedAccountType.value.type);
  selectedAccountType.value = accountTypes[0];
  accountName.value = "";
  visible.value = false;
}

function updateBalance(event: InputEvent, month: string, account: Account) {
  account.balances[month] = Number(event.value);
}
</script>

<template>
  <div v-for="account in accountStore.accounts" :key="account.name">
    <div class="m-0 grid grid-cols-13 gap-4">
      account {{ account.name }}
      <p>Account type: {{ account.type }}</p>
      <p v-for="(balance, month) in account.balances">
        <InputNumber
          :modelValue="balance"
          @input="updateBalance($event, month, account)"
          inputId="integeronly"
          pt:input:root:style="width: 80px;"
        />
      </p>
    </div>
  </div>
  <div class="m-0 grid grid-cols-13 gap-4">
    <p></p>
    <p v-for="sum in accountStore.monthlyTotalBalances">
      {{ sum }}
    </p>
  </div>
  <Button label="Add account" @click="visible = true" />
  <Dialog
    v-model:visible="visible"
    modal
    header="Add account"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-600 dark:text-surface-0/70 block mb-5"
      >Add account.</span
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
