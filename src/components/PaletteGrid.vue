<template>
  <div class="flex flex-col gap-5">
    <button :style="{ background: `var(--primary-500)`, color: bestText }">
      Primary
    </button>

    <div
      :style="{ background: `var(--primary-500)`, color: bestText }"
      class="bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm"
    >
      <a href="#" :style="{color: bestText }">
        <h5
          :style="{ color: bestText }"
          class="mb-2 font-bold text-gray-900 dark:text-white text-2xl tracking-tight"
        >
          Noteworthy technology acquisitions 2021
        </h5>
      </a>
      <p
        :style="{ color: bestText }"
        class="mb-3 font-normal text-gray-700 dark:text-gray-400"
      >
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <a
        href="#"
        :style="{ background: `var(--primary-400)`, color: bestText }"
        class="inline-flex items-center bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-white text-sm text-center"
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
  </div>
</template>
