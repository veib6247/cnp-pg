<script setup lang="ts">
defineProps({
  btnLabel: {
    type: String,
    required: true
  }
})

defineEmits(['submitData'])
</script>

<template>
  <div class="mt-2">
    <button
      class="bg-teal-600 h-14 py-3 px-5 rounded-md font-bold text-slate-50 transition hover:bg-teal-500  active:scale-95 focus:border-sky-300 focus:ring focus:ring-sky-300 focus:ring-opacity-30 space-x-2"
      @click="$emit('submitData')">
      <slot></slot>
      <span>
        {{ btnLabel }}
      </span>
    </button>
  </div>
</template>
