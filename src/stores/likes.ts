import { inject, provide, reactive } from "vue"
import { Building } from "../interfaces/building"

type State = {
  likedBuildingsIds: string[]
}

type LikeStore = {
  like: (building: Building) => void,
  unlike: (building: Building) => void,
  isLiked: (building: Building) => boolean
}

export const createLikeStore = (): LikeStore => {
  const state = reactive<State>({ likedBuildingsIds: [] })

  // TODO: persist like store

  const like = (building: Building) => {
    if (state.likedBuildingsIds.indexOf(building.id) === -1) {
      state.likedBuildingsIds.push(building.id)
    }
  }

  const unlike = (building: Building) => {
    state.likedBuildingsIds = state.likedBuildingsIds.filter(id => id !== building.id)
  }

  const isLiked = (building: Building) => {
    return state.likedBuildingsIds.indexOf(building.id) !== -1
  }

  return { like, unlike, isLiked }
}

export const likeStoreSymbol = Symbol('likeStore')
export const useLikeStore = () => inject<LikeStore>(likeStoreSymbol)
export const provideLikeStore = () => provide(likeStoreSymbol, createLikeStore())