<template>
  <div
    class="flex flex-col flex-1 gap-3 space-y-3 p-4 border rounded w-full transition-colors"
    :class="isDark ? 'bg-white text-gray-900' : 'bg-white text-gray-900'"
  >
    <h2 class="font-semibold">Preview</h2>

    <!-- Primary Button -->
    <div>
      <button
        class="px-5 py-2 rounded transition-colors"
        :style="{ background: selectedHex, color: selectedTextColor }"
      >
        Primary
      </button>
    </div>

    <!-- Heading -->
    <div>
      <h3 :style="{ color: selectedHex }" class="font-bold text-xl">Heading</h3>

      <!-- paragraph -->
      <p :style="{ color: selectedHex }" class="w-100 font-semibold text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate vero
        animi, fuga dolorum, ullam harum consequatur veniam molestiae adipisci
        earum ad praesentium quae nemo eaque ipsa, dicta laudantium tempora
        nihil!
      </p>
    </div>

    <!-- Card & Input -->
    <div class="flex flex-col gap-2">
      <div
        :style="{ background: selectedHex, color: selectedTextColor }"
        :class="
          isDark
            ? 'bg-gray-800 text-white border-gray-700 dark:border-gray-700 shadow-sm p-6 border border-gray-200 rounded-lg max-w-sm'
            : 'bg-gray-100 text-gray-900 border-gray-300 shadow-sm p-6 border border-gray-200 rounded-lg max-w-sm'
        "
      >
        <a href="#">
          <h5
            :style="{ color: selectedTextColor }"
            class="mb-2 font-bold text-gray-900 dark:text-white text-2xl tracking-tight"
          >
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <p
          :style="{ color: selectedTextColor }"
          class="mb-3 font-normal text-gray-700 dark:text-gray-400"
        >
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <a
          :style="{ background: selectedHex, color: selectedTextColor }"
          href="#"
          class="inline-flex items-center shadow-md px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 font-medium text-sm text-center transition-colors"
        >
          Read more
          <svg
            class="ms-2 w-3.5 h-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>

      <input
        :style="{ background: selectedHex }"
        :class="
          isDark
            ? selectedLabel == '50'
              ? 'bg-gray-800 text-black border-gray-700 placeholder-black'
              : 'bg-gray-800 text-white border-gray-700 placeholder-white'
            : selectedLabel == '50'
            ? 'bg-white text-black border-gray-300 placeholder-black'
            : 'bg-white text-white border-gray-300 placeholder-white'
        "
        type="text"
        id="input"
        class="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
        placeholder="Input"
        required
      />
    </div>

    <!-- Link -->
    <div>
      <a
        href="#"
        class="underline transition-colors"
        :style="{ color: selectedHex }"
      >
        Link
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props: selected palette object { hex, textColor?, mode? }
const props = defineProps({
  selected: { type: Object, default: () => ({ hex: "#1E90FF" }) },
});

// Detect dark mode
const isDark = computed(() => {
  // Option 1: controlled via selected.mode
  if (props.selected.mode) return props.selected.mode === "dark";

  // Option 2: fallback to system preference
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
});

// Selected hex
const selectedHex = computed(() => props.selected.hex || "#1E90FF");

// Auto choose readable text color (white/black) based on luminance
function getTextColor(bg) {
  if (!bg) return "#fff";
  const hex = bg.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

const selectedTextColor = computed(() => {
  return props.selected.textColor || getTextColor(props.selected.hex);
});

const selectedLabel = computed(() => {
  return props.selected.label;
});
</script>
