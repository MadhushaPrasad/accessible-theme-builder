<template>
  <div class="grid grid-cols-3 h-full">
    <!-- Left panel -->
    <div class="fixed p-10 h-screen">
      <h1 class="mb-6 font-bold text-3xl">Accessible Theme Builder</h1>
      <ColorPicker v-model="brandColor" @generate="onGenerate" />
    </div>

    <!-- Right panel -->
    <div class="right-0 absolute col-span-2 p-10 h-screen">
      <PaletteGrid :palette="palette" @select="onSelect" />
      <div class="flex flex-row justify-between gap-3 px-4 py-10">
        <PreviewPanel :selected="selected" class="mt-6" />
        <ExportPanel :palette="palette" class="mt-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

const brandColor = ref("#1E90FF");
const palette = ref([]);
const selected = ref({ hex: "#1E90FF", label: "primary" });

function onGenerate() {
  const shades = generateShades(brandColor.value, 10);
  palette.value = Object.entries(shades).map(([label, hex]) => ({
    label,
    hex,
    textColor: bestTextColor(hex),
    ratio: contrastRatio(hex, "#ffffff").toFixed(2),
  }));

  console.log(palette.value)
  applyCssVars(shades, "primary");
}

function onSelect(color) {
  selected.value = color;
}
</script>
