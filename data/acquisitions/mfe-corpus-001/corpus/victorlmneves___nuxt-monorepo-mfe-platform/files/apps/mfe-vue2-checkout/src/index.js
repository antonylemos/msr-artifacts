// Async entry so Module Federation shared scopes initialise before the app runs.
// The shell loads bootstrap.js directly; this file is used only when running
// the checkout MFE standalone for development.

import('./bootstrap').then(({ mount }) => {
  const el = document.getElementById('mfe-app')
  if (el) {
    mount(el, {
      user: {
        id: 'dev',
        name: 'Dev User',
        email: 'dev@example.com',
        token: 'dev-token',
        roles: ['user'],
      },
      onLogout: () => console.log('[Checkout] logout called'),
    })
  }
})
