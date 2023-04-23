<script setup lang="ts">
  defineProps({
    btnLabel: {
      type: String,
      required: false
    }
  })

  defineEmits(['submitData'])
</script>

<template>
  <div>
    <button
      class="bg-indigo-500 h-12 py-3 px-5 font-base font-bold text-white rounded-lg w-full transition hover:bg-indigo-600 active:scale-95 space-x-2"
      @click="$emit('submitData')">
      <slot></slot>
      <span>
        {{ btnLabel }}
      </span>
    </button>
  </div>
</template>
