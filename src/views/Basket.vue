<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { PhArrowRight, PhTrash } from '@phosphor-icons/vue'
import { buyAPI } from '@/stores/BuyAProduct/buyAPI.ts'
import Header from "@/layouts/Header.vue";

const router = useRouter()
const buyApi = buyAPI()

const totalPrice = computed(() => {
  return buyApi.userBasket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
})

const removeItem = (id: number) => {
  buyApi.userBasket = buyApi.userBasket.filter(item => item.id !== id)
}

const updateQuantity = (id: number, delta: number) => {
  const item = buyApi.userBasket.find(i => i.id === id)
  if (item) {
    item.quantity += delta
    if (item.quantity <= 0) removeItem(id)
  }
}

const completePurchase = async () => {
  try {
    for (const item of buyApi.userBasket) {
      buyApi.productId = item.id
      buyApi.quantity = item.quantity
      await buyApi.buyProduct()
    }
    alert('خرید با موفقیت انجام شد!')
    buyApi.userBasket = []
  } catch (err) {
    alert('خطا در خرید!')
    console.error(err)
  }
}
</script>

<template>
  <div>
  <Header/>

    <div v-if="buyApi.userBasket.length === 0" class="text-center p-5">
      <p class="fs-4 text-muted">سبد خرید شما خالی است</p>
      <v-btn color="primary" @click="goBack" class="mt-3">
        بازگشت به فروشگاه
      </v-btn>
    </div>

    <v-container v-else class="mt-4">
      <v-card
        v-for="item in buyApi.userBasket"
        :key="item.id"
        class="mb-3"
      >
        <v-row class="align-items-center p-3">
          <v-col cols="3">
            <v-img
              :src="item.image"
              height="100"
              cover
            ></v-img>
          </v-col>

          <v-col cols="6">
            <h6 class="fw-bold">{{ item.title }}</h6>
            <p class="text-success mb-0">
              {{ item.price.toLocaleString('fa-IR') }} دلار
            </p>
          </v-col>

          <v-col cols="3" class="text-center">
            <div class="d-flex flex-column align-items-center gap-2">
              <v-btn
                size="small"
                icon
                @click="updateQuantity(item.id, 1)"
                color="primary"
              >
                +
              </v-btn>

              <span class="fs-5 fw-bold">{{ item.quantity }}</span>

              <v-btn
                size="small"
                icon
                @click="updateQuantity(item.id, -1)"
                color="primary"
              >
                -
              </v-btn>

              <v-btn
                size="small"
                icon
                @click="removeItem(item.id)"
                color="error"
                class="mt-2"
              >
                <PhTrash :size="20"/>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mt-4 p-4 bg-light">
        <v-row class="align-items-center">
          <v-col cols="6">
            <span class="fs-5">جمع کل:</span>
          </v-col>
          <v-col cols="6" class="text-end">
            <span class="fs-4 fw-bold text-success">
              {{ totalPrice.toLocaleString('fa-IR') }} دلار
            </span>
          </v-col>
        </v-row>

        <v-btn color="success" block class="mt-3" size="large" @click="completePurchase">
          تکمیل خرید
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<style scoped>
.basket-header__background {
  background-color: #a2e4ff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
