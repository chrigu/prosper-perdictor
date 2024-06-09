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
  title?: string;
  labels?: string[];
  data?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "Bar Chart",
  labels: () => [],
  data: () => [],
});

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      backgroundColor: props.data.map((d) =>
        d < 0 ? "rgb(255, 98, 89)" : "rgb(76, 208, 125)",
      ),
      data: props.data,
    },
  ],
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
