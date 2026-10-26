import('./bootstrap').then(({ mount }) => {
  const el = document.getElementById('mfe-app')
  if (el) {
    mount(el, {
      user: { id: 'dev', name: 'Dev User', email: 'dev@example.com', token: 'dev-token', roles: ['user'] },
      onLogout: () => console.log('[Dashboard] logout called'),
    })
  }
})
