export type PaginationStore = {
  setPage: (page: number) => void,
  setLimit: (limit: number) => void,
  state: {
    current: number,
    limit: number
  }
}

export function usePaginationCurrentData<T>(store: PaginationStore | undefined, data: T[]) {
  if (!store) {
    return []
  }

  const { current, limit } = store.state
  const start = current * limit
  const end = start + limit
  const paginatedData = [...data].slice(start, end)
  return paginatedData
}

export function usePaginationPagesAmount<T>(store: PaginationStore | undefined, data: T[]) {
  if (!store) {
    return 0
  }

  const { limit } = store.state
  const pagesAmount = Math.ceil(data.length / limit)
  return pagesAmount
}
