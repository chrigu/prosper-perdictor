<script setup lang="ts">
const taxesStore = useTaxesStore();

function updateExpetedTaxes(value: string, month: number) {
  taxesStore.updateExpectedTaxes(month, Number(value));
}

function updatePaidTaxes(value: string, month: number) {
  taxesStore.updatePaidTaxes(month, Number(value));
}
</script>
<template>
  <div>
    <h1>Taxes</h1>
    <div class="m-0 grid grid-cols-13 gap-4">
      <div>Expected</div>
      <p v-for="(tax, month) in taxesStore.expectedTaxes">
        <input
          type="number"
          class="w-20"
          :value="tax"
          @keyup.enter="updateExpetedTaxes($event.target.value, month)"
        />
      </p>
    </div>
    <div class="m-0 grid grid-cols-13 gap-4">
      <div>Paid</div>
      <p v-for="(tax, month) in taxesStore.paidTaxes">
        <input
          type="number"
          class="w-20"
          :value="tax"
          @keyup.enter="updatePaidTaxes($event.target.value, month)"
        />
      </p>
    </div>
  </div>
</template>
