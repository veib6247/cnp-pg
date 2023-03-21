<script setup lang="ts">
// imports
import { ref } from 'vue'
import { getBrandsList } from './utils/stringsAndStuff'

// components
import HeroSection from './components/HeroSection.vue'
import UserInput from './components/UserInput.vue'
import UserTextArea from './components/UserTextArea.vue'
import SubmitButton from './components/SubmitButton.vue'

const checkoutId = ref('')
const selectedBrands = ref(['VISA', 'MASTER']) // defaults to selecting these 2
const brands = getBrandsList()
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

    <div class="mt-2">
      <label class="block font-semibold">Brands</label>
      <select
        class="mt-1 block font-mono w-full rounded border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-300 focus:ring-opacity-30"
        size="10" v-model="selectedBrands" multiple>
        <option v-for="card in brands.cards" :key="card">{{ card }}</option>
        <option v-for="bank in brands.bank" :key="bank">{{ bank }}</option>
        <option v-for="virtual in brands.virtual" :key="virtual">{{ virtual }}</option>
      </select>
    </div>

    <UserTextArea label="Javascript" v-model="customJs" />

    <SubmitButton @submit-data="sumbit" />

  </section>
</template>