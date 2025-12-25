<script setup lang="ts">
import { ref } from 'vue'
import BaseCounter from '@/components/shared/BaseCounter.vue'

const props = defineProps<{
  product: {
    id: number
    title: string
    price: number
    image: string
    rating: { rate: number }
  }
}>()

const emit = defineEmits<{
  (e: 'buy', payload: { product: any; quantity: number }): void
}>()

const quantity = ref(1)

const increase = () => quantity.value++
const decrease = () => {
  if (quantity.value > 1) quantity.value--
}

const handeBuy = () => {
  emit('buy', {
    product: props.product,
    quantity: quantity.value
  })
}
</script>

<template>
  <v-card class="h-100 d-flex flex-column">
    <v-img :src="product.image" height="200" cover />

    <v-card-title class="text-wrap">{{ product.title }}</v-card-title>
    <v-card-subtitle>{{ product.category }}</v-card-subtitle>

    <v-card-text class="pb-2">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="fs-5 fw-bold text-success">{{ product.price.toLocaleString('fa-IR') }} دلار</span>
        <span class="text-warning">⭐ {{ product.rating.rate }}</span>
      </div>

      <BaseCounter v-model="quantity" />
    </v-card-text>

    <v-card-actions class="pt-0">
      <v-btn color="primary" block @click="handeBuy">
        افزودن به سبد
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
