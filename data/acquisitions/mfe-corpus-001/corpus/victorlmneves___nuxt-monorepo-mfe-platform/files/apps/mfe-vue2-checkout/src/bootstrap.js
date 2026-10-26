import Vue from 'vue'
import App from './App.vue'
import { onAuthChanged, onAuthLogout } from '@mfe/shared/auth'

// Require the pre-built Vuetify 2 dist directly.
// We use require() rather than import so we can catch the .default wrapper.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _vuetify = require('vuetify/dist/vuetify.js')
const Vuetify = _vuetify.default || _vuetify

// CSS imported separately (pre-compiled, no sass needed)
require('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)

let vueInstance = null
let authUnsub = null
let logoutUnsub = null

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
      },
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
