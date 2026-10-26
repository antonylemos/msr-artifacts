<template>
  <div class="mfe-host-layout">
    <ShellHeader :user="auth.user" :active-mfe="mfe" @logout="handleLogout" />

    <div class="mfe-host-body">
      <!-- Loading state -->
      <div v-if="loader.loading.value" class="mfe-host-loading">
        <div class="mfe-host-loading__spinner"></div>
        <p>Loading {{ mfe?.name }}…</p>
      </div>

      <!-- Error state -->
      <div v-if="loader.error.value" class="mfe-host-error">
        <span class="mfe-host-error__icon">⚠</span>
        <div>
          <strong>Could not load {{ mfe?.name }}</strong>
          <p>{{ loader.error.value }}</p>
          <small>Make sure the remote dev server is running.</small>
        </div>
        <NuxtLink to="/" class="mfe-host-error__back">← Back to home</NuxtLink>
      </div>

      <!-- Remote mount point -->
      <div ref="mountEl" class="mfe-host-mount" :class="{ 'mfe-host-mount--hidden': loader.loading.value || loader.error.value }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MFE_REGISTRY } from '@mfe/shared'
import { useAuthStore } from '~/stores/auth'
import { useMfeLoader } from '~/composables/useMfeLoader'

const route = useRoute()
const auth = useAuthStore()
const loader = useMfeLoader()
const mountEl = ref<HTMLElement | null>(null)

// Resolve which MFE we're on from the URL
const mfe = computed(() =>
  MFE_REGISTRY.find((m) => route.path.startsWith(m.route)) ?? null
)

onMounted(async () => {
  if (!mfe.value || !mountEl.value) return
  await loader.mountMfe(mountEl.value, mfe.value, {
    user: auth.user!,
    onLogout: () => auth.logout(),
  })
})

onBeforeUnmount(async () => {
  if (!mfe.value || !mountEl.value) return
  await loader.unmountMfe(mountEl.value, mfe.value)
})

function handleLogout() {
  if (mfe.value && mountEl.value) {
    loader.unmountMfe(mountEl.value, mfe.value)
  }
  auth.logout()
}

definePageMeta({ layout: false })
</script>

<style scoped>
.mfe-host-layout { min-height: 100vh; display: flex; flex-direction: column; }
.mfe-host-body { flex: 1; display: flex; flex-direction: column; }
.mfe-host-mount { flex: 1; }
.mfe-host-mount--hidden { visibility: hidden; }

.mfe-host-loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--brand-text-muted);
}
.mfe-host-loading__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--brand-border);
  border-top-color: var(--brand-primary);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.mfe-host-error {
  max-width: 480px;
  margin: 80px auto;
  padding: 32px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mfe-host-error__icon { font-size: 32px; }
.mfe-host-error p { color: #7F1D1D; font-size: 14px; }
.mfe-host-error small { color: #991B1B; font-size: 12px; }
.mfe-host-error__back {
  display: inline-block;
  margin-top: 8px;
  color: var(--brand-primary);
  font-size: 14px;
  font-weight: 500;
}
</style>
