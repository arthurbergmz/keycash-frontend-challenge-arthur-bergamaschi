<template>
  <p>
    Hello, details!
    <router-link to="/teste2">Go to teste2</router-link>
  </p>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Views from '.';
import { get as getBuilding } from '../api/buildings';

const router = useRouter()
const route = useRoute()

const fetchBuilding = async () => {
  const { buildingId } = route.params

  if (!buildingId) {
    return void router.replace({ name: Views.Buildings })
  }

  console.log({ buildingId })

  const buildingResponse = await getBuilding((d) => d.id.toLowerCase() === (buildingId as string).toLowerCase())

  if (buildingResponse.error) {
    console.error(buildingResponse.error)
    return void router.push({ name: Views.Buildings})
  }
}

watch(() => route.params, async () => {
  fetchBuilding()
}, { immediate: true })

</script>
