<script setup lang="ts">
import ParcelWrapper from "./components/ParcelWrapper.vue";
// import TopbarApp from "./modules/Topbar/src/TopbarApp.vue";
</script>

<template>
  <!-- <TopbarApp></TopbarApp> -->
  <ParcelWrapper app-name="@org/header-app"></ParcelWrapper>
  <ParcelWrapper app-name="@org/content-app"></ParcelWrapper>
</template>
