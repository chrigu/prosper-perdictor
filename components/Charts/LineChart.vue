<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export interface Props {
  labels?: string[];
  data?: { label: string; data: number[] }[];
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => [],
  data: () => [],
});

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.data,
}));

const chartOptions = {
  responsive: true,
};
</script>

<template>
  <Line
    v-if="props.labels.length > 0"
    :options="chartOptions"
    :data="chartData"
  />
</template>
