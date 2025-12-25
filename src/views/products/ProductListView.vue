<script setup lang="ts">
import { onMounted } from 'vue'
import { useStoreProductAPI } from '@/stores/pruducts/storeProductAPI'
import { buyAPI } from '@/stores/card/buyAPI'
import ProductGrid from '@/components/product/ProductGrid.vue'
import Header from "@/layouts/Header.vue";

const productStore = useStoreProductAPI()
const buyApi = buyAPI()

onMounted(() => {
  productStore.getProducts()
})

const handleBuy = ({ product, quantity }) => {
  buyApi.productId = product.id
  buyApi.title = product.title
  buyApi.price = product.price
  buyApi.image = product.image
  buyApi.quantity = quantity
  buyApi.buyProduct()
}
</script>

<template>
  <Header/>
  <div v-if="productStore.loading" class="text-center p-5">
    <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
    <p class="mt-3">در حال بارگذاری محصولات...</p>
  </div>

  <div v-else-if="productStore.error" class="text-center p-5 text-danger">
    <p>{{ productStore.error }}</p>
  </div>

  <div v-else class="p-4">
    <ProductGrid
      :products="productStore.products"
      @buy="handleBuy"
    />
  </div>
</template>
