<template>
  <ul>
    <li v-for="property in properties">
      <h4>{{ property.name }}</h4>
      <p>{{ property.value }}</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  h4 {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 0.875rem;
    opacity: 0.67;
  }

  p {
    font-size: 1.25rem;
  }
}
</style>

<script setup lang="ts">
type Props = {
  properties: {
    name: string,
    value: string | number
  }[]
}

defineProps<Props>()
</script>