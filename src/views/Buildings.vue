<template>
  <buildings-filters @apply-filters="applyFilters($event)"></buildings-filters>
  <Wrapper position="relative" class="wrapper">
    <div class="content">
      <p v-show="state.fetching">
        Carregando...
      </p>
      <p v-show="!state.fetching && state.buildings.length === 0">
        Nenhum resultado encontrado.
      </p>
      <ul class="buildings" v-show="!state.fetching">
        <li v-for="building in state.buildings" :key="building.id">
          <router-link :to="toRouterLink(building)" class="building-link">
            <building-showcase :building="building" details></building-showcase>
          </router-link>
        </li>
      </ul>
    </div>
  </Wrapper>
</template>

<style scoped lang="scss">
.content {
  margin-top: 7rem;
}

.buildings {
  list-style: none;
  padding: 0;
}

.building-link {
  display: block;
  border-radius: 2rem;
}
</style>

<script setup lang="ts">
import Wrapper from '../components/Wrapper.vue'
import BuildingShowcase from '../components/BuildingShowcase.vue'
import BuildingsFilters from '../components/BuildingsFilters.vue'
import { onMounted, reactive } from 'vue'
import { BuildingsResponse, get as getBuildings, getAvailable as getAvailableBuildings } from '../api/buildings'
import { useWarning } from '../functions/useWarning'
import { Building } from '../interfaces/building'

type State = {
  fetching: boolean,
  buildings: Building[]
}

const state = reactive<State>({
  fetching: true,
  buildings: []
})

const toRouterLink = (building: Building) => `/${building.id}`

const setBuildings = (...newBuildings: Building[]) => {
  console.log('setting buildings...', newBuildings)
  state.buildings = [...newBuildings]
}

const applyFilters = async (filtersChain: ((building: Building) => (value: string) => boolean)[]) => {
  state.fetching = true

  const response = await getBuildings((b) => filtersChain.every(f => f(b)))

  if (response.error) {
    return void useWarning(response.error)
  }

  setBuildings(...(response.data || []))

  state.fetching = false
}

onMounted(async () => {
  state.fetching = true
  const response = await getAvailableBuildings()

  if (response.error) {
    return void useWarning(response.error)
  }

  setBuildings(...(response.data || []))

  state.fetching = false
})
</script>
