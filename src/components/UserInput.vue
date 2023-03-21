<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  },

  helperText: {
    type: String,
    required: false
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
    <input type="text"
      class="mt-1 block font-mono w-full rounded border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-300 focus:ring-opacity-30"
      :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    <label class="text-sm" v-if="helperText">{{ helperText }}</label>

  </div>
</template>