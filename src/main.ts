import { createApp } from 'vue'
import App from './App.vue'
import { PaginationLimit } from './enum/PaginationLimit'
import router from './router'
import { buildingPaginationSymbol, createBuildingPaginationStore } from './stores/buildingPagination'
import { createLikeStore, likeStoreSymbol } from './stores/likes'
import './styles/app.scss'

const app = createApp(App)

app.use(router)
app.provide(likeStoreSymbol, createLikeStore())
app.provide(buildingPaginationSymbol, createBuildingPaginationStore(PaginationLimit.REGULAR))

app.mount('#app')
