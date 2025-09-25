<template>
  <div class="flex items-center gap-3">
    <input
      type="color"
      v-model="color"
      class="border rounded w-12 h-12 cursor-pointer"
    />
    <input type="text" v-model="color" class="px-3 py-2 border rounded w-40" />
    <button
      @click="$emit('generate')"
      class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
    >
      Generate
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ modelValue: String });
const emit = defineEmits(["update:modelValue", "generate"]);

const color = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
