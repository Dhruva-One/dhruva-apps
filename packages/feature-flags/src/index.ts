/**
 * Feature flags are evaluated by dhruva-platform (per tenant, campus and role) and cached here
 * for 30 to 60 seconds. If the platform is unreachable, the last known values apply, so a flag
 * outage can never block attendance.
 */
export type Flags = Record<string, boolean>;

export function createFlagCache(fetchFlags: () => Promise<Flags>, ttlMs = 45_000) {
  let lastKnown: Flags = {};
  let fetchedAt = 0;

  return {
    async get(): Promise<Flags> {
      if (Date.now() - fetchedAt < ttlMs) return lastKnown;
      try {
        lastKnown = await fetchFlags();
        fetchedAt = Date.now();
      } catch {
        /* keep last known values */
      }
      return lastKnown;
    },
    isEnabled(flags: Flags, key: string): boolean {
      return flags[key] === true;
    },
  };
}
