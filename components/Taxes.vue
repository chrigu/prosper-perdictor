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
    <h1>Taxes</h1>
    <div class="m-0 grid grid-cols-13 gap-4">
      <div>Expected</div>
      <p v-for="(tax, month) in taxesStore.expectedTaxes">
        <InputNumber
          :modelValue="tax"
          @input="updateExpetedTaxes($event.value, month)"
          inputId="integeronly"
          pt:input:root:style="width: 80px;"
        />
      </p>
    </div>
    <div class="m-0 grid grid-cols-13 gap-4">
      <div>Paid</div>
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
