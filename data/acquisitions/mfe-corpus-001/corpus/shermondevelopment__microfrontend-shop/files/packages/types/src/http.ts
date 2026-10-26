export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type ApiResponse<TData> = {
  data: TData
}

export type ApiErrorResponse = {
  message: string
  statusCode?: number
}

export type RequestParams = Record<string, string | number | boolean | null | undefined>
