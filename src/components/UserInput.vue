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
  <div>
    <label class="block font-bold text-xl text-accent">{{ label }}</label>

    <input type="text"
      class="mt-1 p-3 font-mono bg-primary text-accent text-sm rounded border border-highlights drop-shadow-md block w-full transition focus:border-highlights focus:ring focus:ring-highlights focus:ring-opacity-30"
      :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      spellcheck="false">

    <label class="text-xs text-highlights" v-if="helperText">{{ helperText }}</label>
  </div>
</template>
