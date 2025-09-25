<template>
  <div
    class="space-y-2 bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-white transition-colors"
  >
    <h2 class="font-semibold text-center">Export</h2>
    <button
      v-for="format in formats"
      :key="format"
      class="block bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded w-full text-gray-900 dark:text-white transition-colors"
      @click="exportPalette(format)"
    >
      {{ format }}
    </button>
  </div>
</template>

<script setup>
import { Toast, Dialog } from "@madhusha_99/notification-center";

window.notify = new Toast(); // you can use global variable name as you want
window.dialog = new Dialog();

import {
  toCssVars,
  toScssMap,
  toTailwind,
  toUnoConfig,
} from "./../composables/useExporters";

const props = defineProps({
  palette: { type: Array, default: () => [] },
});

const formats = ["CSS Variables", "SCSS", "Tailwind", "UnoCSS"];

async function exportPalette(format) {
  let output = "";

  try {
    switch (format) {
      case "CSS Variables":
        output = toCssVars(props.palette);
        break;
      case "SCSS":
        output = toScssMap(props.palette);
        break;
      case "Tailwind":
        output = toTailwind(props.palette);
        break;
      case "UnoCSS":
        output = toUnoConfig(props.palette);
        break;
    }

    if (JSON.stringify(props.palette).length <= 2) {
      notify.success({
        title: "Warning!",
        type: "warning",
        text: "You Should Generate Colour Palette",
        position: "top-3 right-3",
        duration: 3000,
      });
    } else {
      if (output) {
        await navigator.clipboard.writeText(output);
        notify.success({
          title: "Success!",
          type: "success",
          text: `${format} copied to clipboard!`,
          position: "top-3 right-3",
          duration: 3000,
        });
      }
    }
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
</script>
