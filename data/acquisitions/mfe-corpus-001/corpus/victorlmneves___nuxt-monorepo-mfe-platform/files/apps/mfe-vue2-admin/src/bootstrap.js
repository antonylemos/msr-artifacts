import Vue from 'vue'
import App from './App.vue'
import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _vuetify = require('vuetify/dist/vuetify.js')
const Vuetify = _vuetify.default || _vuetify
require('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)

let vueInstance = null
let authUnsub = null
let logoutUnsub = null

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: { primary: '#2E7D32', secondary: '#424242', accent: '#69F0AE' },
    },
  },
})

export function mount(el, props) {
  const { user, onLogout } = props

  authUnsub = onAuthChanged((newUser) => {
    if (vueInstance) vueInstance.$data.currentUser = newUser
  })
  logoutUnsub = onAuthLogout(() => unmount(el))

  vueInstance = new Vue({
    vuetify,
    data() { return { currentUser: user } },
    render(h) {
      return h(App, { props: { user: this.currentUser, onLogout } })
    },
  }).$mount(el)
}

export function unmount(el) {
  if (vueInstance) { vueInstance.$destroy(); vueInstance = null }
  if (authUnsub) { authUnsub(); authUnsub = null }
  if (logoutUnsub) { logoutUnsub(); logoutUnsub = null }
}

export default { mount, unmount }
