<script setup lang="ts">
import Menu from "primevue/menu";
import "primeicons/primeicons.css";

const items = [
  {
    label: "Import",
    icon: "pi pi-file-import",
    command: () => {
      triggerFileInput();
    },
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
const fileInput = ref<HTMLInputElement | null>(null);

function toggle(event) {
  menu.value?.toggle(event);
}

function triggerFileInput() {
  fileInput.value?.click();
}

function importJson() {
  const file = fileInput.value?.files?.[0];
  if (!file) return;

  importFromJson(file);
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
        <input
          type="file"
          ref="fileInput"
          @change="importJson"
          class="hidden"
          accept=".json"
        />
      </div>
      <NuxtPage />
    </div>
  </div>
</template>
