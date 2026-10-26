<template>
  <div class="container">
    <Counter/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Counter from "./Counter.vue";

  export default defineComponent({
    name: "App",
    components: {
      Counter,
    },
  });
</script>
