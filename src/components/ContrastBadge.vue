<template>
  <span
    class="bg-white/70 px-2 py-1 border rounded font-mono text-xs"
  >
    {{ ratio }}
  </span>
</template>

<script setup>
defineProps({
  ratio: { type: Number, default: 1 },
})
</script>
