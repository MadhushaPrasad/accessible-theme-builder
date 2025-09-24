<template>
  <div class="flex items-center gap-4">
    <label for="brand" class="sr-only">Brand color</label>
    <input
      id="brand"
      type="color"
      v-model="color"
      @input="onInput"
      aria-label="Pick brand color"
    />
    <input v-model="hex" @change="onHexChange" aria-label="Hex input" />
    <button @click="onGenerate" class="btn">Generate</button>
    <div class="ml-4">
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
