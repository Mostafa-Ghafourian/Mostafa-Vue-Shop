<script setup lang="ts">
import Login from '@/views/authorization/Login.vue'
import SignUp from '@/views/authorization/SignUp.vue'
import { ref } from "vue"

let loginOrSingUp = ref<number>(1)

const handleLogin = (value: number) => {
  console.log('Login emitted value:', value)
  loginOrSingUp.value = value
}
</script>

<template>
  <Login
    class="w-100"
    v-if="loginOrSingUp === 1"
    @loginEmit="handleLogin"
  />
  <SignUp
    class="w-100"
    v-else
    @singUpEmit="handleLogin"
  />
</template>
