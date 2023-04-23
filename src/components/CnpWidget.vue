<script setup lang="ts">
  import { computed, onMounted } from 'vue'

  const props = defineProps({
    checkoutId: {
      type: String,
      required: true
    },

    shopperResultURL: {
      type: String,
      required: true
    },

    brandList: {
      type: Array,
      required: true
    }
  })

  /**
   * format list of brands into string
   */
  const brands = computed(() => {
    return props.brandList.join(' ')
  })

  /**
   * add the script tag into the DOM
   */
  onMounted(() => {
    console.info(`Selected brands: ${brands.value}`)
  })
</script>

<template>
  <div>
    <form :action="shopperResultURL" class="paymentWidgets" :data-brands="brands"></form>
  </div>
</template>