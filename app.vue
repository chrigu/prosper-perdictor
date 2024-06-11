<script setup lang="ts">
import Menu from "primevue/menu";
import "primeicons/primeicons.css";

const items = [
  {
    label: "Home",
  },
  {
    label: "Settings",
  },
];
</script>

<template>
  <div>
    <!-- <div
      class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[220px] overflow-y-auto text-centerx"
    >
      <Menu :model="items" />
    </div> -->
    <div class="mx-4 my-8">
      <NuxtPage />
    </div>
  </div>
</template>
