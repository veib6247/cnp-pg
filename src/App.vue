<script setup lang="ts">
// imports
import { ref } from 'vue'
import { getBrandsList } from './utils/stringsAndStuff'

// components
import HeroSection from './components/HeroSection.vue'
import UserInput from './components/UserInput.vue'
import UserTextArea from './components/UserTextArea.vue'
import SubmitButton from './components/SubmitButton.vue'
import LaunchIcon from './components/icons/LaunchIcon.vue'
import TrashIcon from './components/icons/TrashIcon.vue'
import CnpWidget from './components/CnpWidget.vue'

const checkoutId = ref('')
const selectedBrands = ref(['VISA', 'MASTER']) // defaults to selecting these 2
const brands = getBrandsList()
const customJs = ref('')
const isLaunchWidget = ref(false)

/**
 * 
 */
function sumbit() {
  if (checkoutId.value == '') {
    alert('Checkout ID cannot be empty!')
  } else {
    // todo: create script tag then append to head
    const scriptTag = document.createElement('script')
    scriptTag.setAttribute('id', 'widgy-boi')
    scriptTag.setAttribute('src', `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId.value}`)

    document.head.append(scriptTag)
  }

  // eval
  isLaunchWidget.value = checkoutId.value !== '' ? true : false
}

function reset() {
  isLaunchWidget.value = false
}
</script>

<template>
  <HeroSection />

  <section class="container mx-auto bg-white p-10 rounded-2xl shadow-lg">
    <!-- get checkout ID from user -->
    <UserInput label="Checkout ID" helper-text="This is taken from the step 1 of CopyandPay." v-model="checkoutId" />

    <!-- select brands here -->
    <div class="mt-2">
      <label class="block font-semibold">Brands</label>
      <select
        class="mt-1 p-5 block font-mono w-full rounded border-gray-300 shadow-sm transition focus:border-sky-300 focus:ring focus:ring-sky-300 focus:ring-opacity-30"
        size="6" v-model="selectedBrands" multiple>
        <option class="p-2 transition rounded-lg" v-for="card in brands.cards" :key="card">{{ card }}</option>
        <option class="p-2 transition" v-for="bank in brands.bank" :key="bank">{{ bank }}</option>
        <option class="p-2 transition" v-for="virtual in brands.virtual" :key="virtual">{{ virtual }}</option>
      </select>
    </div>

    <div class="mt-4">
      <a class="p-3 mr-1 bg-amber-100 rounded-2xl text-sm font-mono" v-for="brand in selectedBrands" :key="brand">
        {{ brand }}
      </a>
    </div>

    <UserTextArea label="Javascript" v-model="customJs" />

    <div class="flex flex-row gap-2">
      <SubmitButton btn-label="Launch the Widgy!" @submit-data="sumbit">
        <LaunchIcon />
      </SubmitButton>

      <SubmitButton btn-label="Yeet the Widgy!" @submit-data="reset">
        <TrashIcon />
      </SubmitButton>
    </div>

    <CnpWidget :checkout-id="checkoutId" :brand-list="selectedBrands" v-if="isLaunchWidget" />
  </section>
</template>