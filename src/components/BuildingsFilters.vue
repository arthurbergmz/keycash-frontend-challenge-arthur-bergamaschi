<template>
  <Wrapper class="wrapper">
    <div class="filters-wrapper">
      <div class="filters-header">
        <b>Filtros</b>
        <button @click="toggle()">{{ isOpen ? 'Fechar' : 'Abrir' }}</button>
      </div>
      <div :class="{ 'closed': !isOpen }">
        <div>
          <label>
            <b>{{ filters.address.label }}</b>
            <input name="teste" v-model="filters.address.value" placeholder="Localização" />
          </label>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top: 1rem;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
}

.filters-wrapper {
  background-color: #f7f7f7;
  border-radius: 2rem;
  padding: 1.25rem 2rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  b,
  button {
    font-weight: bolder;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  button {
    color: rgba(0, 0, 0, 0.67);
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    min-width: 7rem;
    text-align: center;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }


}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Building } from '../interfaces/building';
import Wrapper from './Wrapper.vue';

const isOpen = ref(true)

const toggle = () => void (isOpen.value = !isOpen.value)

const filters = reactive({
  address: {
    label: 'Localização',
    value: '',
    group: 0,
    apply: (building: Building) => building?.address?.formattedAddress?.includes(filters.address.value) ?? false
  },
  priceFrom: {
    label: 'Preço mínimo',
    value: '',
    group: 1,
    apply: (building: Building) => building?.price >= +filters.priceFrom.value
  },
  priceTo: {
    label: 'Preço máximo',
    value: '',
    group: 1,
    apply: (building: Building) => building?.price <= +filters.priceTo.value
  },
  usableAreaFrom: {
    label: 'Área útil mínima',
    value: '',
    group: 2,
    apply: (building: Building) => building?.usableArea >= +filters.usableAreaFrom.value
  },
  usableAreaTo: {
    label: 'Área útil máxima',
    value: '',
    group: 2,
    apply: (building: Building) => building?.usableArea <= +filters.usableAreaTo.value
  },
  bathroomsFrom: {
    label: 'Mínimo de banheiros',
    value: '',
    group: 3,
    apply: (building: Building) => building?.bathrooms >= +filters.bathroomsFrom.value
  },
  bathroomsTo: {
    label: 'Máximo de banheiros',
    value: '',
    group: 3,
    apply: (building: Building) => building?.bathrooms <= +filters.bathroomsTo.value
  },
  bedroomsFrom: {
    label: 'Mínimo de quartos',
    value: '',
    group: 4,
    apply: (building: Building) => building?.bedrooms >= +filters.bedroomsFrom.value
  },
  bedroomsTo: {
    label: 'Máximo de quartos',
    value: '',
    group: 4,
    apply: (building: Building) => building?.bedrooms <= +filters.bedroomsTo.value
  }
})


</script>