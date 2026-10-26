<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { setupMsg, MyButton } from '@repo/ui-kit/src/index.ts';

const DashboardWidget = defineAsyncComponent(() => 
  import('dashboard/Widget')
);
</script>

<template>
  <div class="w-full p-4 space-y-8">
    
    <div class="p-6 bg-slate-100 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">{{ setupMsg }}</h1>
      <MyButton label="Botón del UI Kit (Local)" />
    </div>

    <div class="p-6 border border-dashed border-gray-400 rounded-lg">
      <h2 class="mb-4 text-gray-500">👇 Esto viene via red desde el Dashboard 👇</h2>
      
      <Suspense>
        <template #default>
          <DashboardWidget />
        </template>
        <template #fallback>
          <div>Cargando microfrontend...</div>
        </template>
      </Suspense>
      
    </div>

  </div>
</template>