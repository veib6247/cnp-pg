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
    <UserInput label="Checkout ID" v-model="checkoutId" />

  </section>
</template>
