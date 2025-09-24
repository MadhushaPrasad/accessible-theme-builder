<template>
  <div class="flex flex-row w-full h-full">
    <div class="fixed flex flex-col p-10 w-1/2 h-screen">
      <h1 class="mb-6 font-bold text-4xl">Accessible Theme Builder</h1>
      <ColorPicker @generate="onGenerate" />
    </div>
    <div class="right-0 absolute p-10 w-150 h-screen overflow-y-scroll">
      <PaletteGrid :palette="palette" :level="level" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ColorPicker from "./components/ColorPicker.vue";
import PaletteGrid from "./components/PaletteGrid.vue";
import { generateShades, applyCssVars } from "./composables/useColorEngine.js";

const palette = ref({});
const level = ref("AA");

function onGenerate({ base, level: lvl }) {
  palette.value = generateShades(base, 9);
  applyCssVars(palette.value, "primary");
  level.value = lvl;
}
</script>
