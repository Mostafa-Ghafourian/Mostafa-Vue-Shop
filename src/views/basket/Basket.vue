<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { buyAPI } from '@/stores/card/buyAPI.ts'
import Header from '@/layouts/Header.vue'
import { BasketItem, BasketSummary } from '@/components/basket'

const router = useRouter()
const buyApi = buyAPI()

const userBasket = computed(() => buyApi.userBasket)

const totalPrice = computed(() =>
  userBasket.value.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
)

const updateQuantity = (id: number, delta: number) => {
  buyApi.updateQuantity(id, delta)
}

const removeItem = (id: number) => {
  buyApi.removeItem(id)
}

const completePurchase = async () => {
  await buyApi.completePurchase()
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <Header />

    <div v-if="userBasket.length === 0" class="text-center p-5">
      <p class="fs-4 text-muted">سبد خرید شما خالی است</p>
      <v-btn color="primary" @click="goBack" class="mt-3">
        بازگشت به فروشگاه
      </v-btn>
    </div>

    <v-container v-else class="mt-4">
      <BasketItem
        v-for="item in userBasket"
        :key="item.id"
        :item="item"
        @increase="updateQuantity(item.id, 1)"
        @decrease="updateQuantity(item.id, -1)"
        @remove="removeItem(item.id)"
      />

      <BasketSummary
        :totalPrice="totalPrice"
        @completePurchase="completePurchase"
      />
    </v-container>
  </div>
</template>
