<script setup lang="ts">
import { ref } from 'vue'
import {autorizationAPI} from "@/stores/Autorization/autorizationAPI.ts";

const authLoginStore = autorizationAPI()

const loginEmit = ref<number>(null)
const emit = defineEmits(['loginEmit'])
let userName = ref<string>('')
let userPassword = ref<number>('')

const chancePage = () => {
  loginEmit.value = 2
  emit('loginEmit', loginEmit.value)
}

const handleLogin = () => {
  authLoginStore.username = userName.value
  authLoginStore.password = userPassword.value
  authLoginStore.fetchLogin()
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" elevation="10" rounded="xl">

      <v-card-title class="text-center text-h5">
        ورود به حساب
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="نام کاربری"
          type="text"
          variant="outlined"
          v-model="userName"
        />
        <v-text-field
          label="رمز عبور"
          type="password"
          variant="outlined"
          v-model="userPassword"
        />
      </v-card-text>

      <v-card-actions class="d-flex flex-column">
        <p>
          تاکنون ثبت نام نکردید؟
        <v-btn block color="primary" @click="chancePage">
          ثبت نام
        </v-btn>
        </p>
        <v-btn block color="primary" @click="handleLogin">
          ورود
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<style scoped>

</style>
