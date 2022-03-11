import { createRouter, createWebHistory } from 'vue-router'
import Views from './views'

const useRouteComponent = (path: string, componentName: string) => ({
  component: () => import(`./views/${componentName}.vue`),
  name: componentName,
  path
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    useRouteComponent('/', Views.Buildings),
    useRouteComponent('/:buildingId', Views.BuildingDetails)
  ]
})

export default router
