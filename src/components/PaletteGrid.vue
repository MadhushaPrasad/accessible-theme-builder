<template>
  <div>
    <h2 class="mb-2 font-semibold">Light Palette</h2>
    <div class="gap-3 grid grid-cols-5 p-4 border rounded">
      <div
        v-for="(c, i) in palette"
        :key="i"
        class="flex flex-col items-center p-2 border rounded cursor-pointer"
        :style="{ backgroundColor: c.hex, color: c.textColor }"
        @click="$emit('select', c)"
      >
        <span class="font-medium text-sm">{{ c.label }}</span>
        <ContrastBadge :ratio="c.ratio" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ContrastBadge from "./ContrastBadge.vue";

defineProps({
  palette: { type: Array, default: () => [] },
});

defineEmits(["select"]);
</script>
