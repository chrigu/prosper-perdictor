<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export interface Props {
  labels?: string[];
  data?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => [],
  data: () => [],
});

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{ data: props.data }],
}));

const chartOptions = {
  responsive: true,
};
</script>

<template>
  {{ chartData }}
  <Bar
    v-if="props.labels.length > 0"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>
