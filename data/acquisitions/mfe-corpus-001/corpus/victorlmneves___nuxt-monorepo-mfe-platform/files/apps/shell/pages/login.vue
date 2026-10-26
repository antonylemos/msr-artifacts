<!-- apps/shell/pages/login.vue -->
<template>
  <div class="login-page">
    <div class="login-card">
      <span class="login-card__icon">⬡</span>
      <h1>MFE Platform</h1>
      <button @click="handleLogin">Sign in with Auth0</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "#imports";
definePageMeta({ layout: false });
const { signIn } = useAuth();

const handleLogin = async () => {
  await signIn("auth0", { callbackUrl: "/" });
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
}
.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.08);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-card__icon {
  font-size: 2.5rem;
  color: #36936a;
  margin-bottom: 1rem;
}
button {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  background: #36936a;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #287a54;
}
/* .login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1976D2 100%);
}
.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,.2);
}
.login-card__brand {
  text-align: center;
  margin-bottom: 36px;
}
.login-card__icon {
  font-size: 40px;
  color: var(--brand-primary);
  display: block;
  margin-bottom: 8px;
}
.login-card__title {
  font-size: 24px;
  font-weight: 700;
  color: var(--brand-text);
}
.login-card__sub {
  color: var(--brand-text-muted);
  font-size: 14px;
  margin-top: 4px;
}
.login-form { display: flex; flex-direction: column; gap: 20px; }
.login-form__field { display: flex; flex-direction: column; gap: 6px; }
.login-form__field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--brand-text);
}
.login-form__field input {
  padding: 10px 14px;
  border: 1.5px solid var(--brand-border);
  border-radius: var(--brand-radius);
  font-size: 15px;
  transition: border-color .15s;
  outline: none;
}
.login-form__field input:focus {
  border-color: var(--brand-primary);
}
.login-form__error {
  background: #FEE2E2;
  color: #B91C1C;
  padding: 10px 14px;
  border-radius: var(--brand-radius);
  font-size: 13px;
}
.login-form__submit {
  padding: 12px;
  background: var(--brand-primary);
  color: #fff;
  border: none;
  border-radius: var(--brand-radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s;
}
.login-form__submit:hover:not(:disabled) {
  background: var(--brand-primary-dk);
}
.login-form__submit:disabled {
  opacity: .6;
  cursor: not-allowed;
}
.login-form__spinner {
  display: inline-block;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.login-form__hint {
  text-align: center;
  font-size: 12px;
  color: var(--brand-text-muted);
} */
</style>
