<script setup lang="ts">
defineProps({
  btnLabel: {
    type: String,
    required: true
  }
})

defineEmits(['submitData'])
</script>

<template>
  <div class="mt-2">
    <button
      class="bg-accent h-14 py-3 px-5 rounded-md font-bold text-primary drop-shadow-md transition hover:bg-highlights  active:scale-95 focus:border-highlights focus:ring focus:ring-highlights focus:ring-opacity-30 space-x-2"
      @click="$emit('submitData')">
      <slot></slot>
      <span>
        {{ btnLabel }}
      </span>
    </button>
  </div>
</template>
