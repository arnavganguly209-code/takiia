import { apiUrl } from "./site";

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers,
    credentials: "include"
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error(data.error ?? `Request failed (${response.status})`);
  }
  return data;
}

const CSRF_STORAGE_KEY = "takiia_csrf";

export function rememberCsrf(token?: string | null) {
  if (typeof window === "undefined" || !token) {
    return;
  }
  window.sessionStorage.setItem(CSRF_STORAGE_KEY, token);
}

export function csrfFromDocument(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.sessionStorage.getItem(CSRF_STORAGE_KEY);
  if (stored) {
    return stored;
  }
  const match = document.cookie.match(/(?:^|; )takiia_csrf=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}
