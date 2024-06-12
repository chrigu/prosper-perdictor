<script setup lang="ts">
import Menu from "primevue/menu";
import "primeicons/primeicons.css";

const items = [
  {
    label: "Import",
    icon: "pi pi-file-import",
  },
  {
    label: "Export",
    icon: "pi pi-file-export",
    command: () => {
      exportAsJson();
    },
  },
];

const menu = ref<Menu | null>(null);

function toggle(event) {
  menu.value?.toggle(event);
}
</script>

<template>
  <div>
    <div class="mx-4 my-8">
      <div class="flex justify-end">
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
      <NuxtPage />
    </div>
  </div>
</template>
