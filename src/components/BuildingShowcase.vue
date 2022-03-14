<template>
  <div class="wrapper">
    <div class="images">
      <Swiper :modules="modules" loop navigation :pagination="{ clickable: true }">
        <SwiperSlide v-for="imageUrl in images" :key="imageUrl" >
          <div class="image-wrapper">
            <div class="image-resolution">
              <img :src="imageUrl" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="info">
      <h2 class="address">{{ firstAddress }}</h2>
      <h3 class="price">{{ price }}</h3>
      <building-properties :properties="properties"></building-properties>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  border-radius: 2rem;
  overflow: hidden;
  margin: 2.5rem 0;
  background-color: #fafafa;

  &:hover {
    background-color: #f7f7f7;
  }
}

.image-wrapper {
  position: relative;
  max-height: 20rem;
  overflow: hidden;
}

.image-resolution {
  padding-top: 56.25%;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  padding: 1.5rem 3rem 2.5rem;
}

.address {
  font-size: 1.875em;
  font-weight: bolder;
  line-height: 1.5;
}

.price {
  text-transform: uppercase;
  font-weight: bolder;
  opacity: 0.5;
  font-size: 1.25em;
  line-height: 1;
}
</style>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { computed } from 'vue';
import { Navigation, Pagination, A11y } from 'swiper'
import BuildingProperties from './BuildingProperties.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Building } from '../interfaces/building'
import { useCurrency } from '../functions/useCurrency'

type Props = {
  building: Building
}

const currency = useCurrency('pt-br')

const { building } = defineProps<Props>()

const images = computed(() => building.images)
const firstAddress = computed(() => building.address?.formattedAddress)
const price = computed(() => `${currency(building.price)}`)
const properties = computed(() => [
  { name: 'Área útil', value: `${building.usableArea}m²` },
  { name: 'Dormitórios', value: building.bedrooms },
  { name: 'Banheiros', value: building.bathrooms },
  { name: 'Vagas', value: building.parkingSpaces }
])

const modules = [
  Navigation,
  Pagination,
  A11y
]

</script>