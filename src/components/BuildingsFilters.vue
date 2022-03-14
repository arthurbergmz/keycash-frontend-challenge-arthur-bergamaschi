<template>
  <Wrapper class="wrapper">
    <div class="filters-wrapper">
      <div class="filters-header">
        <b>Filtros</b>
        <button @click="toggle()">{{ isOpen ? 'Fechar' : 'Abrir' }}</button>
      </div>
      <div class="filters-popup" :class="{ 'closed': !isOpen }">
        <form>
          <div class="filters">
            <div v-for="filterGroup in filters" class="filter-group">
              <Input v-for="filter in filterGroup" class="filter"
                :name="filter.name"
                :label="filter.label"
                :placeholder="filter.placeholder"
                v-model="filter.value.value" />
            </div>
          </div>
          <button type="submit" @click.prevent="applyFilters()">Aplicar</button>
        </form>
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

.filters-popup {
  margin-top: 1rem;

  &.closed {
    max-height: 0;
    overflow: hidden;
    margin-top: 0;
  }

  button {
    border-radius: 0.25rem;
    background-color: rgba(85, 68, 241, 0.1);
    padding: 1rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: rgb(85, 68, 241);
    cursor: pointer;

    &:hover {
      background-color: rgba(85, 68, 241, 0.2);
    }
  }
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filters {
  overflow-y: auto;
  max-height: 56vh;
}

.filter {
  margin-right: 1rem;
  max-width: 16rem;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { Building } from '../interfaces/building';
import Wrapper from './Wrapper.vue';
import Input from './Input.vue';

const emit = defineEmits(['applyFilters'])

const isOpen = ref(true)

const toggle = () => void (isOpen.value = !isOpen.value)

const filters = [
  [
    {
      name: 'address',
      label: 'Localização',
      value: ref(''),
      placeholder: 'Ex: Rua Bandeira Paulista...',
      apply: (building: Building, value: string) => building?.address?.formattedAddress?.toLowerCase().includes(value.trim().toLowerCase()) ?? false
    }
  ],
  [
    {
      name: 'priceFrom',
      label: 'Preço mínimo',
      value: ref(''),
      placeholder: 'Ex: 0',
      apply: (building: Building, value: string) => building?.price >= +value
    },
    {
      name: 'priceTo',
      label: 'Preço máximo',
      value: ref(''),
      placeholder: 'Ex: 100.000',
      apply: (building: Building, value: string) => building?.price <= +value
    },
  ],
  [
    {
      name: 'usableAreaFrom',
      label: 'Área útil mínima',
      value: ref(''),
      placeholder: 'Ex: 0',
      apply: (building: Building, value: string) => building?.usableArea >= +value
    },
    {
      name: 'usableAreaTo',
      label: 'Área útil máxima',
      value: ref(''),
      placeholder: 'Ex: 100',
      apply: (building: Building, value: string) => building?.usableArea <= +value
    }
  ],
  [
    {
      name: 'bathroomsFrom',
      label: 'Mínimo de banheiros',
      value: ref(''),
      placeholder: 'Ex: 0',
      apply: (building: Building, value: string) => building?.bathrooms >= +value
    },
    {
      name: 'bathroomsTo',
      label: 'Máximo de banheiros',
      value: ref(''),
      placeholder: 'Ex: 2',
      apply: (building: Building, value: string) => building?.bathrooms <= +value
    }
  ],
  [
    {
      name: 'bedroomsFrom',
      label: 'Mínimo de quartos',
      value: ref(''),
      placeholder: 'Ex: 0',
      apply: (building: Building, value: string) => building?.bedrooms >= +value
    },
    {
      name: 'bedroomsTo',
      label: 'Máximo de quartos',
      value: ref(''),
      placeholder: 'Ex: 3',
      apply: (building: Building, value: string) => building?.bedrooms <= +value
    }
  ]
]

const applyFilters = () => {
  const filterChain = filters.flatMap(filterGroup => filterGroup.filter(filter => filter.value.value !== '')).map((f) => {
    const snapshot = f.value.value

    return (building: Building) => f.apply(building, snapshot)
  })

  emit('applyFilters', filterChain)

  isOpen.value = false
}

</script>