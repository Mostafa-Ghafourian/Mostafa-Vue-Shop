<script setup lang="ts">
defineProps<{ item: { id: number; title: string; price: number; quantity: number; image: string } }>()
defineEmits(['increase', 'decrease', 'remove'])
</script>

<template>
  <v-card class="mb-3">
    <v-row class="align-items-center p-3">
      <v-col cols="3">
        <v-img :src="item.image" height="100" cover />
      </v-col>

      <v-col cols="6">
        <h6 class="fw-bold">{{ item.title }}</h6>
        <p class="text-success mb-0">{{ item.price.toLocaleString('fa-IR') }} دلار</p>
      </v-col>

      <v-col cols="3" class="text-center">
        <div class="d-flex flex-column align-items-center gap-2">
          <v-btn size="small" icon color="primary" @click="$emit('increase')">+</v-btn>
          <span class="fs-5 fw-bold">{{ item.quantity }}</span>
          <v-btn size="small" icon color="primary" @click="$emit('decrease')">-</v-btn>
          <v-btn size="small" icon color="error" class="mt-2" @click="$emit('remove')">
            حذف
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
