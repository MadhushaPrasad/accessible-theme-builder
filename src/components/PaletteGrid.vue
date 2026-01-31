<template>
  <div>
    <h2 class="mb-2 px-4 font-semibold">Color Palette</h2>
    <div 
      class="gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 p-4 border rounded transition-colors"
      :class="isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'"
      role="listbox"
      aria-label="Color palette shades"
    >
      <button
        v-for="(c, i) in palette"
        :key="i"
        role="option"
        :aria-selected="false"
        :aria-label="`Color shade ${c.label}, hex ${c.hex}, contrast ratio ${c.ratio}`"
        class="flex flex-col items-center p-2 border rounded cursor-pointer transition-all hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm hover:shadow-md"
        :style="{ backgroundColor: c.hex, color: c.textColor }"
        @click="$emit('select', c)"
      >
        <span class="font-medium text-sm">{{ c.label }}</span>
        <ContrastBadge :ratio="c.ratio" />
      </button>
    </div>
  </div>
</template>

<script setup>
import ContrastBadge from "./ContrastBadge.vue";

defineProps({
  palette: { type: Array, default: () => [] },
  isDark: { type: Boolean, default: false }
});

defineEmits(["select"]);
</script>
