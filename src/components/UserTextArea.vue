<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  },

  modelValue: {
    type: String,
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mt-2">

    <label class="block font-semibold">{{ label }}</label>
    <textarea rows="10"
      class="mt-1 p-4 block font-mono w-full rounded border-gray-300 shadow-sm transition focus:border-sky-300 focus:ring focus:ring-sky-300 focus:ring-opacity-30"
      :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"></textarea>
  </div>
</template>