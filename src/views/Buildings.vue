<template>
  <buildings-filters></buildings-filters>
  <Wrapper position="relative">
    <ul class="buildings" style="margin-top: 7rem;">
      <li v-for="building in buildings" :key="building.id">
        <building-showcase :building="building"></building-showcase>
      </li>
    </ul>
  </Wrapper>
</template>

<style scoped lang="scss">
.buildings {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
</style>

<script setup lang="ts">
import Wrapper from '../components/Wrapper.vue'
import BuildingShowcase from '../components/BuildingShowcase.vue'
import BuildingsFilters from '../components/BuildingsFilters.vue'
import { onMounted, reactive } from 'vue'
import { BuildingsResponse, get as getBuildings } from '../api/buildings'
import { useWarning } from '../functions/useWarning'
import { Building } from '../interfaces/building'

const buildings = reactive<BuildingsResponse>([])
const filters = {}

let filtering: ((building: Building) => boolean)[] = []

onMounted(async () => {
  const response = await getBuildings((building) => filtering.length > 0 ? filtering.every((f) => f(building)) : true)

  if (response.error) {
    useWarning(response.error)
  } else {
    console.log({ response })

    buildings.push(...response.data as BuildingsResponse)
  }
})
</script>
