<template>
  <div class="flex flex-wrap items-center gap-3">
    <div class="flex items-center gap-2">
      <label for="color-picker" class="sr-only">Select brand color</label>
      <input
        id="color-picker"
        type="color"
        v-model="color"
        aria-label="Color picker"
        class="border rounded w-12 h-12 cursor-pointer transition-colors"
        :class="isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'"
      />
    </div>
    <div class="flex items-center gap-2">
      <label for="color-hex" class="sr-only">Hex color value</label>
      <input 
        id="color-hex"
        type="text" 
        v-model="color" 
        aria-label="Hex color value"
        class="px-3 py-2 border rounded w-32 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
        :class="isDark 
          ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'"
      />
    </div>
    <button
      @click="$emit('generate')"
      class="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-4 py-2 rounded font-medium text-white transition-colors"
    >
      Generate
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ 
  modelValue: String,
  isDark: { type: Boolean, default: false }
});
const emit = defineEmits(["update:modelValue", "generate"]);

const color = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
