<script setup lang="ts">
import { months } from "../utils/index";

const predictionStore = usePredictionsStore();

const predictionsWithoutNextYear = computed(() =>
  predictionStore.predictions.slice(0, 11),
);

const cashPredictions = computed(() =>
  predictionStore.predictions.map((p: Prediction) => p.balanceCash),
);

const predictions = computed(() => {
  return predictionStore.predictions.map((p: Prediction) => p.balance);
});

const predictionsWithTax = computed(() => {
  return predictionStore.predictions.map((p: Prediction) => p.balanceWithTax);
});

const chartData = computed(() => ({
  labels: months,
  datasets: [
    {
      label: "With investments",
      data: predictions.value,
      borderColor: "rgb(153, 102, 255)",
    },
    {
      label: "With tax",
      data: predictionsWithTax.value,
      borderColor: "rgb(54, 162, 235)",
    },
    {
      label: "Cash",
      data: cashPredictions.value,
      borderColor: "rgb(75, 192, 192)",
    },
  ],
}));
</script>
<template>
  <div>
    <div class="m-0 grid grid-cols-13 gap-4 mb-4">
      <h2>Cash</h2>
      <div></div>
      <p class="mb-4" v-for="p in cashPredictions.slice(0, 11)">{{ p }}</p>
      <div>+ investments</div>
      <div></div>
      <p class="mb-4" v-for="p in predictions.slice(0, 11)">{{ p }}</p>
      <div>+ unpaid tax</div>
      <div></div>
      <p class="mb-4" v-for="p in predictionsWithTax.slice(0, 11)">{{ p }}</p>
    </div>
    <p class="mb-4" v-if="predictionStore.predictions.length === 12">
      Next year: {{ predictionStore.predictions[11] }}
    </p>
    <ToggleContent :content-name="'chart'">
      <ChartsLineChart :labels="chartData.labels" :data="chartData.datasets" />
    </ToggleContent>
  </div>
</template>
