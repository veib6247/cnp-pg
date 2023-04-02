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


  defineEmits(['update:modelValue', 'keyEnterAction'])
</script>

<template>
  <div>

    <label class="font-bold text-xl text-amber-400">{{ label }}</label>

    <textarea rows="5"
      class="mt-1 p-3 block bg-slate-700 font-mono text-slate-300 caret-amber-400 text-xs w-full rounded border-none drop-shadow-md transition focus:ring focus:ring-amber-300 focus:ring-opacity-30"
      :value="modelValue" @keyup.ctrl.enter="$emit('keyEnterAction')"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" spellcheck="false">
                              </textarea>
  </div>
</template>