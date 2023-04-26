<script setup lang="ts">
  // lib imports
  import { ref, computed, onMounted } from 'vue'
  import { getBrandsList, stringifyTag } from './utils/stringsAndStuff'

  // components
  import UserInput from './components/UserInput.vue'
  import UserTextArea from './components/UserTextArea.vue'
  import SubmitButton from './components/SubmitButton.vue'
  import CnpWidget from './components/CnpWidget.vue'

  // icons
  import LaunchIcon from './components/icons/LaunchIcon.vue'
  import InfoIcon from './components/icons/InfoIcon.vue'
  import CopyIcon from './components/icons/CopyIcon.vue'

  /**
   * all vars
   */
  const checkoutId = ref('')
  const isInputError = ref(false)

  // defaults to selecting these 2
  const selectedBrands = ref(['VISA', 'MASTER'])

  const brands = getBrandsList()
  const shopperResultURL = ref('https://docs.oppwa.com/tutorials/integration-guide')

  // based on wpwlOptions
  const widgyOpts = {
    style: 'plain',
    showLabels: true,
    labels: {
      brand: 'Card Scheme',
      cardHolder: 'Holder',
      cardNumber: 'Number',
      expiryDate: 'Expiry',
      cvv: 'CVV 2',
      submit: 'Submit',
    },
    showPlaceholders: false,
    brandDetection: true,
    brandDetectionType: 'binlist',
    maskCvv: true,
    showCVVHint: true,
    spinner: {
      lines: 20,
      length: 0,
      width: 12,
      radius: 45,
      scale: 1.85,
      corners: 1,
      speed: 2.2,
      rotate: 0,
      color: 'pink',
    },
  }

  // to be populated on mount
  const customJs = ref('')
  const isLaunchWidget = ref(false)

  /**
   * returns the form tag with the brand list already joined by a space
   */
  const stringifiedBrands = computed(() => {
    return `<form action="${shopperResultURL.value}" class="paymentWidgets" data-brands="${selectedBrands.value.join(' ')}"></form>`
  })

  /**
   * 
   */
  const stringifiedScript = computed(() => {
    return stringifyTag(checkoutId.value)
  })

  /**
   * let 'em rip
   */
  const sumbit = () => {
    if (checkoutId.value == '') {
      isInputError.value = true
      const element = document.getElementById('checkoutID')
      element?.scrollIntoView()
    } else {
      isInputError.value = false
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

  /**
   * 
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${stringifiedScript.value}\n${stringifiedBrands.value}`)
  }

  /**
   * format the array and put it as the default value on the textarea
   */
  onMounted(() => {
    customJs.value = `var wpwlOptions = ${JSON.stringify(widgyOpts, null, 2)}`
  })
</script>

<template>
  <div class="container mx-auto my-5 font-base flex flex-row gap-3">
    <!-- left column -->
    <div
      class="shrink-0 max-w-5xl py-12 px-10 bg-gray-50 border border-stone-300 rounded-2xl drop-shadow-sm flex flex-col gap-6">

      <!-- get checkout ID from user -->
      <UserInput id="checkoutID" label="Checkout ID" :is-error="isInputError"
        placeholder-text="e.g. 83DDC7947E3BBF205E1F6A5A3F992384.uat01-vm-tx01"
        helper-text="This is taken from the step 1 of CopyandPay" @key-enter-action="sumbit" v-model="checkoutId" />

      <!-- select brands here -->
      <div>
        <label class="font-bold text-xl text-gray-700">Brands</label>
        <select
          class="mt-1 p-3 block font-mono text-xs accent-pink-300 cursor-pointer w-1/2 rounded-lg border-none bg-slate-200 text-slate-800 transition focus:ring focus:ring-indigo-300 focus:ring-opacity-30"
          size="4" v-model="selectedBrands" multiple>

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
        <label class="text-xs text-slate-500">This will be added in the <code>data-brands</code> attribute of the
          form</label>
      </div>

      <!-- redirect URL here -->
      <UserInput label="Shopper Result URL" placeholder-text="e.g. https://docs.oppwa.com/tutorials/integration-guide"
        helper-text="You will be redirected here after the transaction" @key-enter-action="sumbit"
        v-model="shopperResultURL" />

      <!-- Custom JS here -->
      <UserTextArea label="Javascript Object for Customization" @key-enter-action="sumbit" v-model="customJs" />

      <!-- sample source here -->
      <div class="flex flex-col gap-2">
        <div>
          <h1 class="text-gray-700 text-xl font-bold">HTML Elements</h1>
        </div>

        <div class="relative">
          <!-- alwyas sticks to the top-right of this div -->
          <button
            class="p-1 rounded bg-indigo-500 text-white absolute top-2 right-2 transition hover:bg-indigo-600 active:scale-95"
            @click="copyToClipboard">
            <CopyIcon />
          </button>

          <div class="bg-gray-200 rounded-md p-5 text-slate-800">
            <span class="text-xs font-mono" :class="{ 'text-red-500': !checkoutId }">{{ stringifiedScript }}</span>
            <br>
            <span class="text-xs font-mono" :class="{ 'text-red-500': selectedBrands.length < 1 }">
              {{ stringifiedBrands }}
            </span>
          </div>
          <label class="text-xs text-slate-500">
            You can paste these directly in your HTML document
          </label>
        </div>
      </div>



      <!-- button -->
      <SubmitButton btn-label="Launch the Widget" @submit-data="sumbit">
        <LaunchIcon />
      </SubmitButton>

      <!-- insert script tag dynamically -->
      <div id="codeGoesHere">
      </div>
    </div>

    <!-- right column -->
    <div class="m-auto flex flex-col gap-5">
      <!-- notif here -->
      <div class="bg-blue-400 p-4 rounded-lg w-full flex flex-row gap-3">
        <div class="my-auto text-gray-800">
          <InfoIcon />
        </div>

        <div>
          <h1 class="text-gray-800 font-bold">Note</h1>
          <p class="text-xs text-gray-800">
            This is a one-time setup only; if you wish to revise your customization, you need to <strong>reload</strong>
            the
            page.
          </p>
        </div>
      </div>

      <CnpWidget :checkout-id="checkoutId" :brand-list="selectedBrands" :shopper-result-u-r-l="shopperResultURL"
        v-if="isLaunchWidget" />

      <!--  -->
      <iframe name="myCustomIframe"></iframe>
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