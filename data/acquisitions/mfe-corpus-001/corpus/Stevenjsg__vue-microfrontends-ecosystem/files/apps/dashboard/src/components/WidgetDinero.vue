<script setup lang="ts">
import { ref } from 'vue';

const amount = ref(1500);
</script>

<template>
  <div class="p-4 border-2 border-green-500 rounded-xl bg-green-50">
    <h2 class="text-green-800 font-bold text-lg">💰 Balance Dashboard</h2>
    <p class="text-3xl font-black text-green-600">${{ amount }}</p>
    <button 
      @click="amount += 100"
      class="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
    >
      Ingresar $100
    </button>
    <p class="text-xs text-gray-500 mt-2">Este componente vive en el puerto 5001</p>
  </div>
</template>