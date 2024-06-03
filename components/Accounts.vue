<script setup lang="ts">
import type { Month, Transaction } from "./types/index";
import Button from "primevue/button";

const props = defineProps<{
  title: string;
  month: Month;
  transactions: Transaction[];
}>();

const emit = defineEmits<{
  (e: "addTransaction", transaction: Transaction): void;
}>();

const visible = ref(false);
const selectedAccountType: Ref<AccountType> = ref("cash");
const accountTypes: { type: AccountType; label: string }[] = [
  { type: "cash", label: "Cash" },
  { type: "investment", label: "Investment" },
  { type: "pension", label: "Pension" },
];
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add account"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-600 dark:text-surface-0/70 block mb-5"
      >Add account</span
    >
    <div class="flex items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-[6rem]">Name</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-[6rem]">Account Type</label>
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
