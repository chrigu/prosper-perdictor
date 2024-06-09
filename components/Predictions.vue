<script setup lang="ts">
const predictionStore = usePredictionsStore();
</script>
<template>
  <div>
    <h1>Predictions</h1>
    <div class="m-0 grid grid-cols-13 gap-4">
      <div></div>
      <p v-for="som in predictionStore.predictions.slice(0, 11)">{{ som }}</p>
    </div>
    <p v-if="predictionStore.predictions.length === 12">
      Next year: {{ predictionStore.predictions[11] }}
    </p>
  </div>
</template>
