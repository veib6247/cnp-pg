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
      class="mt-1 p-3 block font-mono text-slate-300 text-xs w-full rounded border-highlights drop-shadow-md bg-black transition focus:border-highlights focus:ring focus:ring-highlights focus:ring-opacity-30"
      :value="modelValue" @keyup.ctrl.enter="$emit('keyEnterAction')"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" spellcheck="false">
              </textarea>
  </div>
</template>