<template>
  <div class="home-layout">
    <ShellHeader :user="auth.user" :active-mfe="null" @logout="auth.logout()" />

    <main class="home-main">
      <div class="home-main__inner">
        <div class="home-hero">
          <h2 class="home-hero__title">Welcome back, {{ auth.user?.name }}</h2>
          <p class="home-hero__sub">Choose an application to open</p>
        </div>

        <div class="mfe-grid">
          <NuxtLink
            v-for="mfe in registry"
            :key="mfe.id"
            :to="mfe.route"
            class="mfe-card"
            :style="{ '--card-color': mfe.color }"
          >
            <span class="mfe-card__icon">{{ mfe.icon }}</span>
            <div class="mfe-card__body">
              <h3 class="mfe-card__name">{{ mfe.name }}</h3>
              <p class="mfe-card__desc">{{ mfe.description }}</p>
            </div>
            <span class="mfe-card__badge" :class="mfe.framework === 'vue2' ? 'badge--v2' : 'badge--v3'">
              {{ mfe.framework === 'vue2' ? 'Vue 2' : 'Vue 3' }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { MFE_REGISTRY } from '@mfe/shared'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false })

const auth = useAuthStore()
const registry = MFE_REGISTRY
</script>

<style scoped>
.home-layout { min-height: 100vh; display: flex; flex-direction: column; }
.home-main { flex: 1; padding: 40px 24px; }
.home-main__inner { max-width: 1200px; margin: 0 auto; }
.home-hero { margin-bottom: 40px; }
.home-hero__title { font-size: 28px; font-weight: 700; color: var(--brand-text); }
.home-hero__sub { color: var(--brand-text-muted); margin-top: 4px; }

.mfe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.mfe-card {
  background: #fff;
  border-radius: 12px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1.5px solid var(--brand-border);
  border-top: 4px solid var(--card-color);
  box-shadow: var(--brand-shadow);
  transition: transform .15s, box-shadow .15s;
  position: relative;
}
.mfe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,.1);
}
.mfe-card__icon { font-size: 32px; }
.mfe-card__name { font-size: 17px; font-weight: 600; }
.mfe-card__desc { font-size: 13px; color: var(--brand-text-muted); margin-top: 2px; }
.mfe-card__badge {
  align-self: flex-start;
  padding: 2px 10px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .5px;
  color: #fff;
}
.badge--v2 { background: #1B5E20; }
.badge--v3 { background: #4A148C; }
</style>
