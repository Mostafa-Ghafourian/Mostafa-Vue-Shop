<script setup lang="ts">
import {PhBasket, PhUserCircle} from "@phosphor-icons/vue";
import {ref} from "vue";
import router from "@/router";

const isLogin = localStorage.getItem('Token')

const goToBasket = () => {
  router.push('/basket')
}
const goToAutorization = () => {
  router.push('/a')
}
const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="h-auto home-header__background rounded-bottom-5">
    <v-row class="d-flex justify-content-between align-items-center p-4 ">
      <v-col cols="6">
        <v-btn @click="goToBasket" variant="text" class="h-100">
          <PhBasket size="42" class="mx-2"/>
        </v-btn>
        <v-btn variant="text" class="h-100" v-if="isLogin">
          <PhUserCircle :size="42" class="mx-2"/>
        </v-btn>
        <v-btn variant="text" class="h-100 fs-4" v-else @click="goToAutorization">
          ورود/ثبت نام
        </v-btn>
      </v-col>
      <v-col cols="6" class="fs-3 fw-bold text-end" @click="goToHome">فروشگاه مصطافا</v-col>
    </v-row>
  </div>
</template>

<style scoped>
.home-header__background {
  background-color: #79e2ff;
}
</style>
