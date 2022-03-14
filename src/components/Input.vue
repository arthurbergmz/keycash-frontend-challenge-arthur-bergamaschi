<template>
  <label>
    <b>{{ label }}</b>
    <input :name="name" :placeholder="placeholder" :value="modelValue" @input="emitValue($event)" />
  </label>
</template>

<style scoped lang="scss">
label {
  display: inline-block;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
}

b {
  display: block;
  font-size: 0.875rem;
  padding: 0.25rem 1rem 0 1rem;
}

input {
  padding: 0 1rem 0.25rem 1rem;
  width: 100%;
}
</style>

<script setup lang="ts">
type Props = {
  name: string,
  label: string,
  modelValue: string,
  placeholder?: string
}

// TODO: add filter types, so the user can only input numbers in bathrooms amount, for example

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const emitValue = (event: Event) => emit('update:modelValue', (event?.target as HTMLInputElement)?.value)
</script>
