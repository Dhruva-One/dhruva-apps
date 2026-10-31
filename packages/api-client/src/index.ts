/**
 * Thin client for the dhruva-platform API.
 * Replace the hand-written calls with a client generated from dhruva-platform/contracts/openapi
 * once the contract is published; keep this file's interface stable for the apps.
 */
export interface ClientOptions {
  baseUrl: string;
  getToken?: () => Promise<string | null>;
  /** Local development only, until phone + OTP sign-in exists. */
  devTenantId?: string;
}

export interface Health {
  status: string;
  service?: string;
}

const newRequestId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function createClient(opts: ClientOptions) {
  async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    const token = await opts.getToken?.();
    if (token) headers.authorization = `Bearer ${token}`;
    if (opts.devTenantId) headers['x-dev-tenant-id'] = opts.devTenantId;
    // Every mutating call carries an idempotency key so retries on poor networks are safe.
    if (method !== 'GET') headers['idempotency-key'] = newRequestId();
    const res = await fetch(opts.baseUrl + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`);
    return (await res.json()) as T;
  }

  return {
    health: () => request<Health>('GET', '/health'),
    campuses: () => request<{ id: string; name: string; city: string | null }[]>('GET', '/v1/campuses'),
    request,
  };
}

export type DhruvaClient = ReturnType<typeof createClient>;
