<template>
  <div class="wrapper" :style="{ position }">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  padding: 0 16px;
  max-width: 48rem;
  margin: 0 auto;
}
</style>

<script setup lang="ts">
type Props = {
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static' | 'inherit' | 'initial' | 'unset'
}

const { position } = defineProps<Props>()
</script>