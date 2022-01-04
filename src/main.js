import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import OktaVue from '@okta/okta-vue'
import { oktaAuth } from './okta'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

createApp(App)
  .use(router)
  .use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => {
      router.push('/login')
    },
    onAuthResume: () => {
      router.push('/login')
    }
  })
  .mount('#app')
