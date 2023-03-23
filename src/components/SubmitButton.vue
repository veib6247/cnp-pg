<script setup lang="ts">
import LaunchIcon from './icons/LaunchIcon.vue'

defineProps({
  btnLabel: {
    type: String,
    required: true
  },

  showIcon: {
    type: Boolean,
    required: true
  }
})

defineEmits(['submitData'])
</script>

<template>
  <div class="mt-2">
    <button
      class="bg-teal-600 h-14 py-3 px-5 rounded-md font-bold text-slate-50 hover:bg-teal-500 active:scale-95 space-x-2 transition"
      @click="$emit('submitData')">
      <LaunchIcon v-if="showIcon" />
      <span>
        {{ btnLabel }}
      </span>
    </button>
  </div>
</template>
