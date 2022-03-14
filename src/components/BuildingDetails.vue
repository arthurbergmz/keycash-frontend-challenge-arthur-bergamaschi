<template>
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
  <Wrapper>
    <div class="info">
      <router-link :to="toList" class="back-button">🔙</router-link>
      <button class="like-button" :class="{ liked: isLiked }" @click="toggleLike()">{{ likeEmoji }}</button>
      <h2 class="address">{{ firstAddress }}</h2>
      <h3 class="price">{{ price }}</h3>
      <building-properties :properties="properties" class="properties"></building-properties>
    </div>
    <div class="contact">
      <button>Entrar em contato</button>
    </div>
    <div class="description">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eum rem magni minima labore, asperiores modi cum totam voluptate ipsum. Tempora dolorem amet perferendis vero sequi praesentium ipsa quam distinctio.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis molestiae ducimus ipsum magni. Eaque voluptatem at quas assumenda, itaque eos optio sapiente? Suscipit id iste quasi nihil, sint in quidem.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem totam molestias atque quibusdam, eaque, sit possimus dolores, assumenda eos veniam ipsam. Eaque nihil alias aliquid, assumenda est voluptatibus odio molestiae!
      </p>
    </div>
    <div class="map">
      <h3>Localização</h3>

      <p v-show="!googleApiKey">
        Não foi possível carregar o mapa.
      </p>

      <div class="map-wrapper" v-show="googleApiKey">
        <GoogleMap
          :api-key="googleApiKey"
          :center="position"
          style="width: 100%; height: 30rem"
          :zoom="15">
          <Marker :options="{ position }" />
        </GoogleMap>
      </div>
    </div>
  </Wrapper>
</template>

<style scoped lang="scss">
.back-button,
.like-button {
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.back-button {
  background-color: rgba(85, 68, 241, 0.1);
  

  &:hover {
    background-color: rgba(85, 68, 241, 0.2);
  }
}

.like-button {
  background-color: rgba(233, 233, 233, 0.3);
  margin-left: 1rem;

  &.liked {
    background-color: rgba(241, 68, 68, 0.2);
  }
}

.wrapper {
  border-radius: 2rem;
  overflow: hidden;
  margin: 2.5rem auto;
}

.image-wrapper {
  position: relative;
  max-height: 35rem;
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
  padding: 1.5rem 0 0 0;
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

.properties {
  margin-top: 3rem;
}

.contact {
  margin: 2rem 0;

  button {
    width: 100%;
    border-radius: 0.25rem;
    background-color: rgb(85, 68, 241);
    padding: 1rem;
    font-weight: bolder;
    text-transform: uppercase;
    color: #ffffff;
    cursor: pointer;
  }
}

.description {
  margin-top: 2rem;
  
  p {
    margin: 1rem 0;
  }
}

.map {
  h3 {
    font-size: 1.25rem;
    font-weight: bolder;
    margin: 1.25rem 0;
  }
}

.map-wrapper {
  border-radius: 1rem;
  overflow: hidden;
  margin: 1rem 0 2rem 0;
}
</style>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { computed, ref } from 'vue';
import { Navigation, Pagination, A11y } from 'swiper'
import Wrapper from './Wrapper.vue'
import BuildingProperties from './BuildingProperties.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Building } from '../interfaces/building'
import { useCurrency } from '../functions/useCurrency'
import { GoogleMap, Marker } from 'vue3-google-map'
import Views from '../views'
import { useLikeStore } from '../stores/likes';

type Props = {
  building: Building
}

const currency = useCurrency('pt-br')
const likeStore = useLikeStore()

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
const position = computed(() => ({
  lat: building.address?.geolocation?.lat,
  lng: building.address?.geolocation?.lng
}))

const isLiked = computed(() => likeStore?.isLiked(building) ?? false)
const likeEmoji = computed(() => isLiked.value ? '❤️' : '🤍')
const toggleLike = () => isLiked.value ? likeStore?.unlike(building) : likeStore?.like(building)

const googleApiKey = ref('')
const toList = { name: Views.Buildings }

const modules = [
  Navigation,
  Pagination,
  A11y
]

// TODO: create file in /functions to get google api key
if (import.meta?.env?.VITE_GOOGLE_API_KEY) {
  googleApiKey.value = import.meta.env.VITE_GOOGLE_API_KEY as string
} else {
  console.warn('Google API key not found')
}
</script>