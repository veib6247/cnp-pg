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
  <div>

    <label class="font-bold text-xl text-accent">{{ label }}</label>

    <textarea rows="5"
      class="mt-1 p-3 block font-mono text-accent text-sm w-full rounded border-highlights drop-shadow-md bg-primary transition focus:border-highlights focus:ring focus:ring-highlights focus:ring-opacity-30"
      :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      spellcheck="false"></textarea>
  </div>
</template>