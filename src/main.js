import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const pinia = createPinia()

// Add the router to the store
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
