<template>
  <span
    class="bg-white/70 px-2 py-1 border rounded font-mono text-xs"
    :class="ratioClass"
    :aria-label="`Contrast ratio: ${ratio}`"
  >
    {{ ratio }}
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  ratio: { type: [Number, String], default: 1 },
});

// Add visual indicator for WCAG compliance
const ratioClass = computed(() => {
  const numRatio = typeof props.ratio === "string" ? parseFloat(props.ratio) : props.ratio;
  if (numRatio >= 7) return "text-green-700"; // AAA
  if (numRatio >= 4.5) return "text-green-600"; // AA
  if (numRatio >= 3) return "text-yellow-600"; // AA Large
  return "text-red-600"; // Fail
});
</script>
