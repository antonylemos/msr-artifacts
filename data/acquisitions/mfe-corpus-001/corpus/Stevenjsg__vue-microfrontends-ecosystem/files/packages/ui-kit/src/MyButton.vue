<script setup lang="ts">
// Definimos una prop para el texto
defineProps<{ label: string }>()
</script>

<template>
  <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-all">
    {{ label }}
  </button>
</template>