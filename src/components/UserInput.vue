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

  defineEmits(['update:modelValue', 'keyEnterAction'])
</script>

<template>
  <div>
    <label class="block font-bold text-xl text-amber-400">{{ label }}</label>

    <input type="text"
      class="mt-1 p-4 font-mono bg-slate-700 text-slate-300 text-sm caret-amber-400 rounded-lg border-none drop-shadow-md block w-full transition focus:ring focus:ring-amber-300 focus:ring-opacity-30"
      :value="modelValue" @keyup.enter="$emit('keyEnterAction')"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" spellcheck="false">

    <label class="text-xs text-slate-400" v-if="helperText">{{ helperText }}</label>
  </div>
</template>
