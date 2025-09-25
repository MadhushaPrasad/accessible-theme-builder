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
import {
  toCssVars,
  toScssMap,
  toTailwind,
  toUnoConfig,
} from "./../composables/useExporters";

defineProps({
  palette: { type: Array, default: () => [] },
});
const formats = ["CSS Variables", "SCSS", "Tailwind", "UnoCSS"];

function exportPalette(format) {
  switch (format) {
    case "CSS Variables":
      toCssVars(palette);
      break;
    case "SCSS":
      toScssMap(palette);
      break;
    case "Tailwind":
      toTailwind(palette);
      break;
    case "UnoCSS":
      toUnoConfig(palette);
      break;
  }
}
</script>
