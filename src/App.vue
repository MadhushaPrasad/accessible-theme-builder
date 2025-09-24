<template>
  <div class="mx-auto p-8 max-w-4xl">
    <h1 class="mb-6 font-bold text-4xl">Accessible Theme Builder</h1>
    <ColorPicker @generate="onGenerate" />
    <PaletteGrid :palette="palette" :level="level" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ColorPicker from './components/ColorPicker.vue'
import PaletteGrid from './components/PaletteGrid.vue'
import { generateShades, applyCssVars } from './composables/useColorEngine.js'

const palette = ref({})
const level = ref('AA')

function onGenerate({ base, level: lvl }) {
  palette.value = generateShades(base, 9)
  applyCssVars(palette.value, 'primary')
  level.value = lvl
}
</script>
