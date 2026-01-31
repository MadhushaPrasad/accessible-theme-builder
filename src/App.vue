<template>
  <div 
    class="flex flex-col lg:flex-row min-h-screen transition-colors duration-300"
    :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'"
  >
    <!-- Dark Mode Toggle - Fixed top right -->
    <button
      @click="toggleDarkMode"
      class="fixed top-4 right-4 z-50 p-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="isDark 
        ? 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700' 
        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <!-- Sun icon for dark mode -->
      <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
      </svg>
      <!-- Moon icon for light mode -->
      <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
      </svg>
    </button>

    <!-- Left panel -->
    <div 
      class="p-6 lg:p-10 lg:w-80 lg:shrink-0 border-b lg:border-b-0 lg:border-r transition-colors"
      :class="isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'"
    >
      <h1 class="mb-6 font-bold text-2xl lg:text-3xl">Accessible Theme Builder</h1>
      <ColorPicker v-model="brandColor" @generate="onGenerate" :isDark="isDark" />
    </div>

    <!-- Right panel -->
    <div class="flex-1 p-6 lg:p-10 overflow-auto">
      <PaletteGrid :palette="palette" @select="onSelect" :isDark="isDark" />
      <div class="flex flex-col lg:flex-row justify-between gap-6 py-10">
        <PreviewPanel :selected="selectedWithMode" class="flex-1" />
        <ExportPanel :palette="paletteObject" :isDark="isDark" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ColorPicker from "./components/ColorPicker.vue";
import PaletteGrid from "./components/PaletteGrid.vue";
import PreviewPanel from "./components/PreviewPanel.vue";
import ExportPanel from "./components/ExportPanel.vue";
import {
  generateShades,
  applyCssVars,
  bestTextColor,
  contrastRatio,
} from "./composables/useColorEngine.js";

const DEFAULT_COLOR = "#1E90FF";
const brandColor = ref(DEFAULT_COLOR);
const palette = ref([]);
const selected = ref({ hex: DEFAULT_COLOR, label: "primary" });
const isDark = ref(false);

// Initialize dark mode from system preference
if (typeof window !== 'undefined') {
  isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function toggleDarkMode() {
  isDark.value = !isDark.value;
}

// Computed object for export functions (converts array to object format)
const paletteObject = computed(() => {
  const obj = {};
  palette.value.forEach((item) => {
    obj[item.label] = item.hex;
  });
  return obj;
});

// Pass dark mode to PreviewPanel
const selectedWithMode = computed(() => ({
  ...selected.value,
  mode: isDark.value ? 'dark' : 'light'
}));

function onGenerate() {
  const shades = generateShades(brandColor.value, 10);
  palette.value = Object.entries(shades).map(([label, hex]) => ({
    label,
    hex,
    textColor: bestTextColor(hex),
    ratio: Number(contrastRatio(hex, "#ffffff").toFixed(2)),
  }));

  applyCssVars(shades, "primary");
}

function onSelect(color) {
  selected.value = color;
}
</script>
