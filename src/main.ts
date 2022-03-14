import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createLikeStore, likeStoreSymbol } from './stores/likes'
import './styles/app.scss'

const app = createApp(App)

app.use(router)
app.provide(likeStoreSymbol, createLikeStore())

app.mount('#app')
