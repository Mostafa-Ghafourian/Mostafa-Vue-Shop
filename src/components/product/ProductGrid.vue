<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ProductCard from './ProductCard.vue'

const props = defineProps<{ products: any[] }>()
const emit = defineEmits(['buy'])

const handleBuy = (payload) => {
  emit('buy', payload)
}
</script>

<template>
  <v-container class="mt-4">
    <v-row>
      <v-col
        v-for="product in props.products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard
          :product="product"
          @buy="handleBuy"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
