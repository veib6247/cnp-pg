<script setup lang="ts">
import LaunchIcon from './icons/LaunchIcon.vue'
defineEmits(['submitData'])
</script>



<template>
  <div class="mt-2">
    <button class="bg-teal-300 p-3 rounded-md font-bold text-slate-50 hover:bg-teal-400 active:bg-teal-500"
      @click="$emit('submitData')">
      <LaunchIcon />
      <span>
        Launch Widget
      </span>
    </button>
  </div>
</template>
