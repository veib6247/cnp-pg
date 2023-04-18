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
      class="bg-amber-600 h-12 py-3 px-5 font-bold text-primary rounded-md shadow-lg w-full transition duration-300 hover:bg-amber-500 hover:shadow-amber-700/50 active:scale-90 focus:border-highlights focus:ring focus:ring-highlights focus:ring-opacity-30 space-x-2"
      @click="$emit('submitData')">
      <slot></slot>
      <span>
        {{ btnLabel }}
      </span>
    </button>
  </div>
</template>
