import { createApp, ref } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: { primary: '#7B1FA2', secondary: '#E1BEE7' },
      },
    },
  },
})

let app = null
let authUnsub = null
let logoutUnsub = null
let userRef = null

export function mount(el, props) {
  const { user, onLogout } = props

  userRef = ref(user)

  authUnsub = onAuthChanged((newUser) => {
    if (userRef) userRef.value = newUser
  })
  logoutUnsub = onAuthLogout(() => unmount(el))

  app = createApp(App, { user: userRef, onLogout })
  app.use(vuetify)
  app.mount(el)
}

export function unmount(el) {
  if (app) { app.unmount(); app = null }
  if (authUnsub) { authUnsub(); authUnsub = null }
  if (logoutUnsub) { logoutUnsub(); logoutUnsub = null }
}

export default { mount, unmount }
