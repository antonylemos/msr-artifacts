<template>
  <!--
    Vue MFE — Theme Switcher
    Demonstrates a Vue 3 Single File Component (SFC) loaded as a microfrontend.
    The <template>, <script>, and <style> blocks are all in one .vue file.
  -->
  <div class="vue-mfe">
    <h2>🟢 Vue MFE — Theme Switcher</h2>
    <p class="desc">
      This is the <strong>Vue MFE</strong>, running on port <code>3003</code>.
      It was built with Vue 3 and is loaded by the host via Module Federation.
    </p>

    <!-- The coloured box reacts to whichever theme button is active -->
    <div class="theme-box" :style="{ background: activeColor }">
      <p class="theme-label">{{ message }}</p>
    </div>

    <!-- Clicking a button updates the reactive state via Vue's Composition API -->
    <div class="btn-group">
      <button
        v-for="theme in themes"
        :key="theme.color"
        class="theme-btn"
        :style="{ background: theme.color }"
        @click="selectTheme(theme)"
      >
        {{ theme.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',

  setup() {
    // Vue 3 Composition API — reactive state with ref()
    const themes = [
      { name: 'Ocean',   color: '#0077b6' },
      { name: 'Forest',  color: '#2d6a4f' },
      { name: 'Sunset',  color: '#e07a5f' },
      { name: 'Violet',  color: '#6f42c1' },
    ];

    const activeColor = ref(themes[0].color);
    const message     = ref(`Theme: ${themes[0].name}`);

    const selectTheme = (theme) => {
      activeColor.value = theme.color;
      message.value     = `Theme: ${theme.name}`;
    };

    return { themes, activeColor, message, selectTheme };
  },
};
</script>

<style scoped>
/* "scoped" means these styles only apply to this component */

.vue-mfe {
  padding: 24px;
  font-family: sans-serif;
}

h2 {
  color: #42b883;
  margin-bottom: 8px;
}

.desc {
  color: #555;
  margin-bottom: 24px;
  line-height: 1.6;
}

.theme-box {
  padding: 28px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  transition: background 0.3s ease;
}

.theme-label {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.btn-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.theme-btn {
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.theme-btn:hover {
  opacity: 0.85;
}
</style>
