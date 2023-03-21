<script setup lang="ts">
// imports
import { ref } from 'vue'

// components
import HeroSection from './components/HeroSection.vue'
import UserInput from './components/UserInput.vue'
import UserTextArea from './components/UserTextArea.vue'
import SubmitButton from './components/SubmitButton.vue'

const checkoutId = ref('')
const customJs = ref('')

/**
 * 
 */
function sumbit() {
  console.info(checkoutId.value)
}
</script>

<template>
  <HeroSection />

  <section class="container mx-auto p-10">
    <!-- get checkout ID from user -->
    <UserInput label="Checkout ID" helper-text="This is taken from the step 1 of CopyandPay." v-model="checkoutId" />

    <UserTextArea label="Javascript" v-model="customJs" />

    <SubmitButton @submit-data="sumbit" />

  </section>
</template>