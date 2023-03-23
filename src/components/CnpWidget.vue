<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps({
  checkoutId: {
    type: String,
    required: true
  },

  brandList: {
    type: Array,
    required: true
  }
})

/**
 * format into string
 */
const brands = computed(() => {
  let list = ''

  props.brandList.forEach(brand => {
    list += brand + ' '
  })

  return list
})

/**
 * add the script tag into the DOM
 */
onMounted(() => {
  console.info(`Selected brands: ${brands.value}`)
})
</script>

<template>
  <div class="mt-10">
    <form action="https://docs.oppwa.com/tutorials/integration-guide" class="paymentWidgets" :data-brands="brands"></form>
  </div>
</template>