<template>
  <header class="shell-header">
    <div class="shell-header__inner">
      <!-- Logo / brand -->
      <NuxtLink to="/" class="shell-header__logo">
        <span class="shell-header__logo-icon">⬡</span>
        <span class="shell-header__logo-name">MFE Platform</span>
      </NuxtLink>

      <!-- Current MFE breadcrumb -->
      <nav class="shell-header__nav" aria-label="Breadcrumb">
        <span class="shell-header__sep" v-if="activeMfe">›</span>
        <span class="shell-header__mfe-name" v-if="activeMfe">
          {{ activeMfe.icon }} {{ activeMfe.name }}
        </span>
      </nav>

      <!-- Right side: user + logout -->
      <div class="shell-header__right">
        <span class="shell-header__badge" :class="frameworkClass" v-if="activeMfe">
          {{ activeMfe.framework === 'vue2' ? 'Vue 2' : 'Vue 3' }}
        </span>
        <div class="shell-header__user" v-if="user">
          <span class="shell-header__avatar">{{ initials }}</span>
          <span class="shell-header__email">{{ user.name }}</span>
        </div>
        <button class="shell-header__logout" @click="$emit('logout')">
          Sign out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { UserState, MfeDescriptor } from '@mfe/shared/types'

const props = defineProps<{
  user: UserState | null
  activeMfe: MfeDescriptor | null
}>()

defineEmits<{ (e: 'logout'): void }>()

const initials = computed(() =>
  props.user?.name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'
)

const frameworkClass = computed(() =>
  props.activeMfe?.framework === 'vue2' ? 'badge--vue2' : 'badge--vue3'
)
</script>

<style scoped>
.shell-header {
  height: var(--brand-header-h);
  background: var(--brand-primary);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,.2);
}
.shell-header__inner {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.shell-header__logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}
.shell-header__logo-icon { font-size: 22px; }
.shell-header__nav {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  color: rgba(255,255,255,.75);
  font-size: 14px;
}
.shell-header__mfe-name { color: #fff; font-weight: 500; }
.shell-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.shell-header__badge {
  padding: 2px 10px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .5px;
}
.badge--vue2 { background: #1B5E20; }
.badge--vue3 { background: #4A148C; }
.shell-header__user {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.shell-header__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
.shell-header__email { opacity: .85; }
.shell-header__logout {
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.3);
  color: #fff;
  padding: 6px 14px;
  border-radius: var(--brand-radius);
  cursor: pointer;
  font-size: 13px;
  transition: background .15s;
}
.shell-header__logout:hover { background: rgba(255,255,255,.25); }
</style>
