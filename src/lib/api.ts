export function createApi(baseUrl: string) {
  async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${baseUrl}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(error.error || `HTTP ${res.status}`);
    }

    return res.json();
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
    put: <T>(path: string, body?: unknown) =>
      request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  };
}

export type ApiClient = ReturnType<typeof createApi>;
