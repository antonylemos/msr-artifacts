<template>
  <header class="topbar-container">
    <div>
      <h2>Topbar - MFE</h2>
      <div>
        <button @click="changeTheme">
          {{ renderTextByTheme }} - {{ renderIconByTheme }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const theme = ref("light");

const renderIconByTheme = computed(() => {
  return theme.value !== "light" ? "🌞" : "🌜";
});

const renderTextByTheme = computed(() => {
  return theme.value !== "light" ? "Light Mode" : "Dark Mode";
});

// Change schema theme
onMounted(() => {
  // Define tema inicial como light se não existir
  if (!document.documentElement.getAttribute("data-theme")) {
    document.documentElement.setAttribute("data-theme", theme.value);
  }
});

function changeTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  theme.value = newTheme;
}
</script>

<style>
.topbar-container {
  width: 100%;
  height: 3rem;
  background-color: #35495e;
  color: white;
  display: flex;
  align-items: center;
}

.topbar-container > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
}
</style>
