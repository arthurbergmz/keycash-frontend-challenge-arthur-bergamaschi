import { inject, provide, reactive, readonly } from "vue"

type State = {
  current: number,
  limit: number
}

type BuildingPaginationStore = {
  setPage: (page: number) => void,
  setLimit: (limit: number) => void,
  state: State
}

export const createBuildingPaginationStore = (minLimit: number): BuildingPaginationStore => {
  const state = reactive<State>({ current: 0, limit: minLimit })

  const setPage = (page: number) => {
    state.current = page
  }

  const setLimit = (limit: number) => {
    state.limit = limit
  }

  return { setPage, setLimit, state: readonly(state) }
}

export const buildingPaginationSymbol = Symbol('likeStore')
export const useBuildingPaginationStore = () => inject<BuildingPaginationStore>(buildingPaginationSymbol)
export const provideBuildingPaginationStore = (minLimit: number) => provide(buildingPaginationSymbol, createBuildingPaginationStore(minLimit))