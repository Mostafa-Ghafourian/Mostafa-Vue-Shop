<script setup lang="ts">
import Header from '@/layouts/Header.vue';
import HomePageUiAndLogic from "@/components/HomePageUIAndLogic.vue";
</script>

<template>
  <v-app>
  <Header class="position-sticky align-content-start"/>
    <v-main class="pa-0">
  <HomePageUiAndLogic/>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
