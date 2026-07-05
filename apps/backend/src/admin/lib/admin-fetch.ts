const BACKEND_URL = (import.meta.env.VITE_MEDUSA_BACKEND_URL as string) || ""

/**
 * Calls an admin API route, forwarding whichever auth the dashboard uses
 * (session cookie and/or JWT from localStorage).
 */
export async function adminFetch<T>(
  path: string,
  init?: { method?: string; body?: unknown }
): Promise<T> {
  const token = window.localStorage.getItem("medusa_auth_token")
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: init?.method ?? "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
  })
  if (res.status === 401 || res.status === 403) {
    throw new Error("Session expirée — reconnecte-toi à l'admin.")
  }
  return (await res.json().catch(() => ({}))) as T
}
