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
    <label class="font-bold text-xl text-gray-700">{{ label }}</label>
    <textarea rows="15"
      class="mt-1 p-5 block bg-slate-200 font-mono text-slate-800 caret-amber-400 text-xs w-1/2 rounded-lg border-none transition focus:ring focus:ring-indigo-300 focus:ring-opacity-30"
      :value="modelValue" @keyup.ctrl.enter="$emit('keyEnterAction')"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" spellcheck="false">
                                  </textarea>
  </div>
</template>