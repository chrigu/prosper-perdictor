<script setup lang="ts">
const taxesStore = useTaxesStore();

function updateExpetedTaxes(value: number, month: number) {
  taxesStore.updateExpectedTaxes(month, Number(value));
}

function updatePaidTaxes(value: number, month: number) {
  taxesStore.updatePaidTaxes(month, Number(value));
}
</script>
<template>
  <div>
    <div class="m-0 grid grid-cols-13 gap-4 mb-4">
      <h3 class="flex justify-center flex-col">Expected</h3>
      <p v-for="(tax, month) in taxesStore.expectedTaxes" class="my-4">
        <InputNumber
          :modelValue="tax"
          @input="updateExpetedTaxes($event.value, month)"
          inputId="integeronly"
          pt:input:root:style="width: 80px;"
        />
      </p>
    </div>
    <div class="m-0 grid grid-cols-13 gap-4">
      <h3 class="flex justify-center flex-col">Paid</h3>
      <p v-for="(tax, month) in taxesStore.paidTaxes">
        <InputNumber
          :modelValue="tax"
          @input="updatePaidTaxes($event.value, month)"
          inputId="integeronly"
          pt:input:root:style="width: 80px;"
        />
      </p>
    </div>
  </div>
</template>
