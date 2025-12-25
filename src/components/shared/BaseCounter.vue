<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue ?? 1)

watch(localValue, (val) => emit('update:modelValue', val))

const increase = () => localValue.value++
const decrease = () => {
  if (localValue.value > 1) localValue.value--
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-2">
    <v-btn small @click="decrease">-</v-btn>
    <span>{{ localValue }}</span>
    <v-btn small @click="increase">+</v-btn>
  </div>
</template>
