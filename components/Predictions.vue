<script setup lang="ts">
const predictionStore = usePredictionsStore();
</script>
<template>
  <div>
    <h1>Predictions</h1>
    <p v-for="som in predictionStore.predictions">{{ som }}</p>
  </div>
</template>
