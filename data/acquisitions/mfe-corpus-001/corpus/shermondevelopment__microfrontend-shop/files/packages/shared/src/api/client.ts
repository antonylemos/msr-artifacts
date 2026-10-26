import axios, { type AxiosRequestConfig } from 'axios';

type ApiClientConfig = {
  baseUrl?: string
  headers?: AxiosRequestConfig['headers']
}

type RequestOptions = Omit<AxiosRequestConfig, 'baseURL' | 'data' | 'method' | 'url'>

export function createApiClient(config: ApiClientConfig = {}) {
  const client = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return {
    delete: async <TData>(path: string, options?: RequestOptions) =>
      (await client.delete<TData>(path, options)).data,
    get: async <TData>(path: string, options?: RequestOptions) =>
      (await client.get<TData>(path, options)).data,
    patch: async <TData, TBody = unknown>(path: string, body: TBody, options?: RequestOptions) =>
      (await client.patch<TData>(path, body, options)).data,
    post: async <TData, TBody = unknown>(path: string, body: TBody, options?: RequestOptions) =>
      (await client.post<TData>(path, body, options)).data,
    put: async <TData, TBody = unknown>(path: string, body: TBody, options?: RequestOptions) =>
      (await client.put<TData>(path, body, options)).data,
  };
}

export const apiClient = createApiClient();

