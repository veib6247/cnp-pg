<script setup lang="ts">
// imports
import { ref } from 'vue';
// components
import HeroSection from './components/HeroSection.vue';
import UserInput from './components/UserInput.vue';

const checkoutId = ref('Thingy')
</script>

<template>
  <HeroSection />

  <section class="container mx-auto p-10">
    <!-- get checkout ID from user -->
    <label class="block font-semibold">Checkout ID</label>
    <input type="text"
      class="mt-1 block font-mono w-full rounded border-gray-300 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-300 focus:ring-opacity-10"
      v-model="checkoutId">


    <UserInput label="Checkout ID" v-model="checkoutId" />

  </section>
</template>
