<template>
  <div
    class="space-y-2 p-4 border rounded transition-colors lg:w-64"
    :class="isDark 
      ? 'bg-gray-800 border-gray-700 text-white' 
      : 'bg-white border-gray-300 text-gray-900'"
  >
    <h2 class="font-semibold text-center">Export</h2>
    <button
      v-for="format in formats"
      :key="format"
      class="block px-3 py-2 border rounded w-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
      :class="isDark 
        ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white' 
        : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-900'"
      @click="exportPalette(format)"
    >
      {{ format }}
    </button>
  </div>
</template>

<script setup>
import { Toast } from "@madhusha_99/notification-center";
import {
  toCssVars,
  toScssMap,
  toTailwind,
  toUnoConfig,
} from "./../composables/useExporters";

// Create toast instance locally instead of polluting global scope
const notify = new Toast();

const props = defineProps({
  palette: { type: Object, default: () => ({}) },
  isDark: { type: Boolean, default: false }
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

    if (Object.keys(props.palette).length === 0) {
      notify.warning({
        title: "Warning",
        type: "warning",
        icon: "warning",
        class: "toast-notification toast-warning",
        text: "Please generate a color palette first",
        position: "top-right",
        duration: 3500,
        closeButton: true,
        closeButtonClass: "toast-close-btn",
      });
    } else {
      if (output) {
        await navigator.clipboard.writeText(output);
        notify.success({
          title: "Copied!",
          icon: "success",
          type: "success",
          class: "toast-notification toast-success",
          text: `${format} copied to clipboard`,
          position: "top-right",
          duration: 2500,
          closeButton: true,
          closeButtonClass: "toast-close-btn",
        });
      }
    }
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}
</script>
