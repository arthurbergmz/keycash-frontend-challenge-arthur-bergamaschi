<template>
  <div v-show="!request.fetched">
    <Wrapper>
      Carregando...
    </Wrapper>
  </div>

  <div v-show="request.fetched">
    <Wrapper v-show="request.response.length === 0">
      Not found!
    </Wrapper>

    <building-details v-for="building in request.response" :key="building.id" :building="building"></building-details>
  </div>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Views from '.';
import { BuildingsResponse, get as getBuilding } from '../api/buildings';
import BuildingDetails from '../components/BuildingDetails.vue';
import Wrapper from '../components/Wrapper.vue';

type RequestStatus = {
  fetched: boolean
  response: BuildingsResponse
}

const router = useRouter()
const route = useRoute()

const request = reactive<RequestStatus>({ fetched: false, response: [] })

const fetchBuilding = async () => {
  const { buildingId } = route.params

  if (!buildingId) {
    return
  }

  const buildingResponse = await getBuilding((d) => d.id.toLowerCase() === (buildingId as string).toLowerCase())

  if (buildingResponse.error) {
    console.error(buildingResponse.error)
    return void router.push({ name: Views.Buildings })
  }

  if (!buildingResponse.data || buildingResponse.data.length === 0) {
    console.error('building not found')
    request.fetched = true
    request.response = []
    return
  }

  request.fetched = true
  request.response = buildingResponse.data!
}

watch(() => route.params, async () => {
  fetchBuilding()
}, { immediate: true })

</script>
