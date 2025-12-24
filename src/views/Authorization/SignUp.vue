<script setup lang="ts">
import { ref } from 'vue'
import {autorizationAPI} from "@/stores/Autorization/autorizationAPI.ts";

const singUpEmit = ref<number>(null)
const emit = defineEmits(['singUpEmit'])
let id =  null
let userName = ref<string>('')
let userPassword = ref<string>('')
let userEmail = ref<string>('')

const authSingUpStore = autorizationAPI()

const chancePage = () => {
  singUpEmit.value = 1
  emit('singUpEmit', singUpEmit.value)
}
const handleSingUp = () => {
  id = Math.floor(Math.random() * 1000)  // ساخت id تصادفی
  authSingUpStore.id = id
  authSingUpStore.username = userName.value
  authSingUpStore.password = userPassword.value
  authSingUpStore.email = userEmail.value
  authSingUpStore.fetchSingUp()
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" elevation="10" rounded="xl">

      <v-card-title class="text-center text-h5">
        ثبت نام
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
        <v-text-field
          label="ایمیل"
          type="text"
          variant="outlined"
          v-model="userEmail"
        />
      </v-card-text>

      <v-card-actions class="d-flex flex-column">
        <p>
          حساب دارید؟
          <v-btn block color="primary" @click="chancePage">
            ورود
          </v-btn>
        </p>
        <v-btn block color="primary" @click="handleSingUp">
          ثبت نام
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>
