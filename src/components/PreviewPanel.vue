<template>
  <div
    class="flex flex-col gap-4 p-4 sm:p-6 border rounded-lg w-full transition-colors"
    :class="isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'"
  >
    <h2 class="font-semibold text-lg">Preview</h2>

    <!-- Primary Button -->
    <div>
      <button
        class="px-5 py-2.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'"
        :style="{ background: selectedHex, color: selectedTextColor }"
      >
        Primary Button
      </button>
    </div>

    <!-- Heading & Paragraph -->
    <div class="space-y-2">
      <h3 :style="{ color: selectedHex }" class="font-bold text-xl">Sample Heading</h3>
      <p
        :style="{ color: selectedHex }"
        class="text-sm sm:text-base leading-relaxed"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate vero
        animi, fuga dolorum, ullam harum consequatur veniam molestiae adipisci
        earum ad praesentium quae nemo eaque ipsa.
      </p>
    </div>

    <!-- Card -->
    <div
      class="p-4 sm:p-6 border rounded-lg shadow-sm w-full max-w-sm"
      :style="{ background: selectedHex, color: selectedTextColor }"
    >
      <a href="#" class="block">
        <h5
          :style="{ color: selectedTextColor }"
          class="mb-2 font-bold text-lg sm:text-xl tracking-tight"
        >
          Noteworthy technology acquisitions
        </h5>
      </a>
      <p
        :style="{ color: selectedTextColor }"
        class="mb-3 text-sm opacity-90"
      >
        Here are the biggest enterprise technology acquisitions of 2021 so
        far, in reverse chronological order.
      </p>
      <a
        href="#"
        class="inline-flex items-center px-3 py-2 border border-current/20 rounded-lg font-medium text-sm transition-opacity hover:opacity-80 focus:outline-none focus:ring-2"
        :style="{ color: selectedTextColor }"
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

    <!-- Input -->
    <div class="max-w-sm">
      <label for="preview-input" class="sr-only">Sample input field</label>
      <input
        type="text"
        id="preview-input"
        class="block w-full p-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="isDark 
          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'"
        placeholder="Sample input"
        aria-label="Sample input field"
      />
    </div>

    <!-- Link -->
    <div>
      <a
        href="#"
        class="underline transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        :style="{ color: selectedHex }"
      >
        Sample Link
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

// Auto choose readable text color using proper sRGB luminance calculation
function srgbToLinear(v) {
  v = v / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function getTextColor(bg) {
  if (!bg) return "#fff";
  const hex = bg.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Use proper WCAG luminance formula (consistent with useColorEngine.js)
  const luminance = 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  return luminance > 0.179 ? "#000000" : "#ffffff";
}

const selectedTextColor = computed(() => {
  return props.selected.textColor || getTextColor(props.selected.hex);
});

const selectedLabel = computed(() => {
  return props.selected.label;
});
</script>
