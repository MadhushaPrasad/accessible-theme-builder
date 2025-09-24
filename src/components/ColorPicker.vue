<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <input
        id="brand"
        type="color"
        v-model="color"
        @input="onInput"
        aria-label="Pick brand color"
      />
      <label for="brand" class="dark:text-white">Brand color</label>
    </div>
    <div class="flex gap-3">
      <input
        class="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
        v-model="hex"
        @change="onHexChange"
        aria-label="Hex input"
      />
      <button @click="onGenerate" class="btn">Generate</button>
    </div>
    <div class="flex gap-3">
      <label><input type="radio" value="AA" v-model="level" /> AA</label>
      <label class="ml-2"
        ><input type="radio" value="AAA" v-model="level" /> AAA</label
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = {};

const emit = defineEmits(["generate"]);

const color = ref("#1e90ff");
const hex = ref(color.value);
const level = ref("AA");

function onInput() {
  hex.value = color.value;
}

function onHexChange() {
  if (/^#?[0-9A-Fa-f]{3,6}$/.test(hex.value))
    color.value = hex.value.startsWith("#") ? hex.value : "#" + hex.value;
}

function onGenerate() {
  emit("generate", { base: color.value, level: level.value });
}
</script>
