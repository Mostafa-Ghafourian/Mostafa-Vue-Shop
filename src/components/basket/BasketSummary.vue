<script setup lang="ts">
defineProps<{ totalPrice: number }>()
defineEmits(['completePurchase'])
</script>

<template>
  <v-card class="mt-4 p-4 bg-light">
    <v-row class="align-items-center">
      <v-col cols="6"><span class="fs-5">جمع کل:</span></v-col>
      <v-col cols="6" class="text-end">
        <span class="fs-4 fw-bold text-success">
          {{ totalPrice.toLocaleString('fa-IR') }} دلار
        </span>
      </v-col>
    </v-row>
    <v-btn color="success" block class="mt-3" size="large" @click="$emit('completePurchase')">
      تکمیل خرید
    </v-btn>
  </v-card>
</template>

