import './assets/main.css'

import { createApp } from 'vue'
import '@/assets/style.css'
import { createPinia } from 'pinia'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .mount('#app')
