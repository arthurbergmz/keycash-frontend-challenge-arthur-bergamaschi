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
        <li v-for="building in currentPageData" :key="building.id">
          <router-link :to="toRouterLink(building)" class="building-link">
            <building-showcase :building="building" details></building-showcase>
          </router-link>
        </li>
      </ul>
      <div class="pagination-wrapper">
        <Pagination :current-page="currentPage" :pages-amount="pagesAmount" @select-page="setPage($event)" @select-limit="setLimit($event)" />
      </div>
    </div>
  </Wrapper>
</template>

<style scoped lang="scss">
.content {
  margin-top: 7rem;
  padding-bottom: 7rem;
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
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { get as getBuildings, getAvailable as getAvailableBuildings } from '../api/buildings'
import { useWarning } from '../functions/useWarning'
import { Building } from '../interfaces/building'
import { useBuildingPaginationStore } from '../stores/buildingPagination'
import { usePaginationCurrentData, usePaginationPagesAmount } from '../functions/usePagination'
import Pagination from '../components/Pagination.vue'

type State = {
  fetching: boolean,
  buildings: Building[]
}

const pagination = useBuildingPaginationStore()

const state = reactive<State>({
  fetching: true,
  buildings: []
})

const currentPage = computed(() => pagination?.state.current ?? 0)

const currentPageData = computed(() => {
  return usePaginationCurrentData(pagination, state.buildings)
})

const pagesAmount = computed(() => {
  return usePaginationPagesAmount(pagination, state.buildings)
})

const setBuildings = (...newBuildings: Building[]) => {
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

const setPage = (page: number) => {
  pagination?.setPage(page - 1)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const setLimit = (limit: number) => {
  pagination?.setLimit(limit)

  if (currentPage.value > pagesAmount.value) {
    setPage(pagesAmount.value)
  }
}

const toRouterLink = (building: Building) => `/${building.id}`

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
