interface ApiResponse<T, E> {
  status?: number,
  data?: T
  error?: E | Error
}

export async function get<T, E = Error>(url: string, init?: RequestInit): Promise<ApiResponse<T, E>> {
  try {
    const response = await fetch(url, init)

    const status = response.status
    const data = await response.json()

    if (!response.ok) {
      // if response body is available (data.error), use it as error,
      // otherwise use response.statusText
      return { status, error: ((data?.error as E) ?? (new Error(response.statusText))) }
    }

    return { status, data: data as T }
  } catch (err) {
    // error on fetching
    return { error: err as Error }
  }
}
