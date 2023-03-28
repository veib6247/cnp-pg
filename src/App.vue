<script setup lang="ts">
// imports
import { ref, computed } from 'vue'
import { getBrandsList, stringifyTag } from './utils/stringsAndStuff'

// components
import HeroSection from './components/HeroSection.vue'
import UserInput from './components/UserInput.vue'
import UserTextArea from './components/UserTextArea.vue'
import SubmitButton from './components/SubmitButton.vue'
import LaunchIcon from './components/icons/LaunchIcon.vue'
import InfoIcon from './components/icons/InfoIcon.vue'
import CnpWidget from './components/CnpWidget.vue'

const checkoutId = ref('')
const selectedBrands = ref(['VISA', 'MASTER']) // defaults to selecting these 2
const brands = getBrandsList()
const shopperResultURL = ref('https://docs.oppwa.com/tutorials/integration-guide')
const customJs = ref("var wpwlOptions = { style: 'card' }")
const isLaunchWidget = ref(false)

const stringifiedBrands = computed(() => {
  let boi = ''

  selectedBrands.value.forEach((brand) => {
    boi += `${brand} `
  })

  return `<form action="${shopperResultURL.value}" class="paymentWidgets" data-brands="${boi}"></form>`
})

/**
 * 
 */
const stringifiedScript = computed(() => {
  return stringifyTag(checkoutId.value)
})

/**
 * 
 */
const sumbit = () => {
  if (checkoutId.value == '') {
    alert('Checkout ID cannot be empty!')
  } else {
    // todo: add custom JS from the frontend
    const customScript = document.createElement('script')
    customScript.text = customJs.value
    document.getElementById('codeGoesHere')!.appendChild(customScript)

    // todo: create script tag then append to head
    const scriptTag = document.createElement('script')
    scriptTag.setAttribute('id', 'widgy-boi')
    scriptTag.setAttribute('src', `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId.value}`)

    document.head.append(scriptTag)
  }

  // eval
  isLaunchWidget.value = checkoutId.value !== '' ? true : false
}
</script>

<template>
  <HeroSection />

  <div class="container mx-auto flex flex-row gap-5">
    <div class="flex-initial flex-wrap">
      <div class="mb-10 p-10 bg-secondary rounded-2xl drop-shadow-2xl flex flex-col gap-5">
        <!-- get checkout ID from user -->
        <UserInput label="Checkout ID" helper-text="This is taken from the step 1 of CopyandPay"
          @key-enter-action="sumbit" v-model="checkoutId" />


        <!-- select brands here -->
        <div>
          <label class="font-bold text-xl text-accent">Brands</label>

          <select
            class="mt-1 p-3 block font-mono w-full rounded border-highlights bg-primary text-accent text-sm drop-shadow-md transition focus:border-highlights focus:ring focus:ring-highlights focus:ring-opacity-30"
            size="3" v-model="selectedBrands" multiple>

            <option class="px-4 py-1 transition rounded-md" v-for="card in brands.cards" :key="card">
              {{ card }}
            </option>

            <option class="px-4 py-1 transition rounded-md" v-for="bank in brands.bank" :key="bank">
              {{ bank }}
            </option>

            <option class="px-4 py-1 transition rounded-md" v-for="virtual in brands.virtual" :key="virtual">
              {{ virtual }}
            </option>
          </select>

        </div>

        <TransitionGroup name="list" tag="div" class="flex flex-wrap">
          <a class="px-6 py-1 mb-1 mr-1 bg-highlights text-primary rounded-2xl text-sm font-mono drop-shadow-md "
            v-for="brand in selectedBrands" :key="brand">
            {{ brand }}
          </a>
        </TransitionGroup>


        <UserInput label="Shopper Result URL" helper-text="You will be redirected here after the transaction"
          @key-enter-action="sumbit" v-model="shopperResultURL" />

        <UserTextArea label="Custom Javascript" @key-enter-action="sumbit" v-model="customJs" />

        <div class="bg-primary p-4 text-accent rounded-lg drop-shadow-md">
          <h1 class="text-accent font-bold">HTML Elements</h1>
          <p class="text-sm">
            You can paste these directly in your HTML document
          </p>

          <p>
            <span class="text-xs font-mono">{{ stringifiedScript }}</span>
            <br>
            <span class="text-xs font-mono">{{ stringifiedBrands }}</span>
          </p>

        </div>

        <div class="flex flex-row gap-2">
          <SubmitButton btn-label="Launch the Widget" @submit-data="sumbit">
            <LaunchIcon />
          </SubmitButton>
        </div>

        <div class="bg-primary p-4 text-accent rounded-lg drop-shadow-md flex flex-row gap-3">
          <div class="my-auto">
            <InfoIcon />
          </div>
          <div>
            <h1 class="text-accent font-bold">Note</h1>
            <p class="text-sm text-accent">
              This is a one-time setup only; if you wish to revise your customization, you need to <strong>reload</strong>
              the
              page.
            </p>
          </div>
        </div>

        <div id="codeGoesHere">
          <!-- insert script tag dynamically -->
        </div>
      </div>
    </div>

    <div class="m-auto">
      <CnpWidget :checkout-id="checkoutId" :brand-list="selectedBrands" :shopper-result-u-r-l="shopperResultURL"
        v-if="isLaunchWidget" />
    </div>
  </div>
</template>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>