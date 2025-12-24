<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useStoreProductAPI } from '../stores/Pruducts/storeProductAPI.ts'
import { buyAPI } from "@/stores/BuyAProduct/buyAPI.ts"
import { useRouter } from 'vue-router'

const productStore = useStoreProductAPI()
const buyApi = buyAPI()
const router = useRouter()

const productCounters = reactive<{ [key: number]: number }>({})

onMounted(async () => {
  await productStore.getProducts()
  productStore.products.forEach(p => {
    productCounters[p.id] = 1
  })
})

const handleIncrease = (id: number) => {
  productCounters[id]++
}

const handleDecrease = (id: number) => {
  if (productCounters[id] > 1) productCounters[id]--
}

const handleBuy = (product: { id: number }) => {
  buyApi.productId = product.id
  buyApi.title = product.title
  buyApi.prise = product.price
  buyApi.image = product.image
  buyApi.quantity = productCounters[product.id]
  buyApi.buyProduct()
}

</script>

<template>
  <div v-if="productStore.loading" class="text-center p-5">
    <v-progress-circular indeterminate color="primary" :size="70"></v-progress-circular>
    <p class="mt-3">در حال بارگذاری محصولات...</p>
  </div>

  <div v-else-if="productStore.error" class="text-center p-5 text-danger">
    <p>{{ productStore.error }}</p>
  </div>

  <div v-else class="p-4">
    <v-container class="mt-4">
      <v-row>
        <v-col
          v-for="product in productStore.products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="product-card h-100 d-flex flex-column product-card__background">
            <div class="flex-grow-1">
              <v-img :src="product.image" height="200" cover class="product-image" />
              <v-card-title class="text-wrap">{{ product.title }}</v-card-title>
              <v-card-subtitle>{{ product.category }}</v-card-subtitle>
            </div>

            <div class="mt-auto">
              <v-card-text class="pb-2">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fs-5 fw-bold text-success">{{ product.price.toLocaleString('fa-IR') }} دلار</span>
                  <span class="text-warning">⭐ {{ product.rating.rate }}</span>
                </div>

                <div class="d-flex justify-content-center align-items-center gap-2">
                  <v-btn small @click="handleDecrease(product.id)" class="fs-3">-</v-btn>
                  <span>{{ productCounters[product.id] }}</span>
                  <v-btn small @click="handleIncrease(product.id)" class="fs-3">+</v-btn>
                </div>
              </v-card-text>

              <v-card-actions class="pt-0">
                <v-btn color="primary" block variant="flat" @click="handleBuy(product)">
                  افزودن به سبد
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
