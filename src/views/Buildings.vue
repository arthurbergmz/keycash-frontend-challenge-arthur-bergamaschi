<template>
  <p>
    Hello, world!
  </p>
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { getAvailable } from '../api/buildings';

getAvailable().then(buildings => {
  console.log(buildings)
})
</script>
