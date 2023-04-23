<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      required: true
    },

    placeholderText: {
      type: String,
      required: true
    },

    helperText: {
      type: String,
      required: false
    },

    isError: {
      type: Boolean,
    },

    modelValue: {
      type: String,
    }
  })

  defineEmits(['update:modelValue', 'keyEnterAction'])
</script>

<template>
  <div>
    <label class="font-bold text-xl text-gray-700">{{ label }}</label>

    <input type="text"
      class="mt-1 p-4 font-mono text-xs bg-slate-200 text-slate-800  placeholder:text-slate-400 caret-indigo-400 rounded-lg block w-full transition focus:ring focus:ring-indigo-300 focus:ring-opacity-30"
      :class="{ 'border-none': !isError, 'border border-red-500 focus:border-red-500': isError }" :value="modelValue"
      @keyup.enter="$emit('keyEnterAction')"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :placeholder="placeholderText"
      spellcheck="false">

    <label class="text-xs text-slate-500" v-if="helperText">{{ helperText }}</label>
  </div>
</template>
