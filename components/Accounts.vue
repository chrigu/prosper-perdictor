<script setup lang="ts">
import type { Account } from "./types/index";
import Button from "primevue/button";

const props = defineProps<{
  accounts: Account[];
}>();

const emit = defineEmits<{
  (e: "addAccount", account: Account): void;
}>();

const visible = ref(false);
const selectedAccountType: Ref<AccountType> = ref("cash");
const accountName = ref("");
const accountTypes: { type: AccountType; label: string }[] = [
  { type: "cash", label: "Cash" },
  { type: "investment", label: "Investment" },
  { type: "pension", label: "Pension" },
];

function addAccount() {
  emit("addAccount", accountName.value, selectedAccountType.value);
  selectedAccountType.value = accountTypes[0];
  accountName.value = "";
  visible.value = false;
}
</script>

<template>
  <div v-for="account in props.accounts" :key="account.name">
    <div class="m-0 grid grid-cols-13 gap-4">
      account {{ account.name }}
      <p>Account type: {{ account.type }}</p>
      <p v-for="balance in account.balances">
        {{ balance }}
      </p>
    </div>
  </div>
  <Button label="Add account" @click="visible = true" />
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
