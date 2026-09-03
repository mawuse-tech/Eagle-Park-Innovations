const fallbackApiUrl = 'http://localhost:5050';

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? fallbackApiUrl).replace(/\/$/, '');

export function apiUrl(path: string): string {
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function errorMessage(body: unknown, status: number): string {
  if (body && typeof body === 'object') {
    if ('message' in body && typeof body.message === 'string') return body.message;
    if ('error' in body && typeof body.error === 'string') return body.error;
    if ('errors' in body && Array.isArray(body.errors)) {
      const messages = body.errors.flatMap((error) => {
        if (typeof error === 'string') return error;
        if (error && typeof error === 'object' && 'msg' in error) return String(error.msg);
        return [];
      });
      if (messages.length) return messages.join(' ');
    }
  }
  return `Request failed with status ${status}`;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

  let response: Response;
  try {
    response = await fetch(apiUrl(path), { ...options, headers });
  } catch {
    throw new ApiError(0, 'Unable to reach the server. Please check your connection and try again.');
  }
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    throw new ApiError(response.status, errorMessage(body, response.status));
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
