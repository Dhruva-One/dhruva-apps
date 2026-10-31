import { useEffect, useState } from 'react';
import { createClient } from '@dhruva/api-client';
import { colors, font, radius, spacing } from '@dhruva/design-tokens';
import { t, type Locale } from '@dhruva/i18n';
import { roles } from '@dhruva/navigation';

const api = createClient({ baseUrl: '/api', devTenantId: import.meta.env.VITE_DEV_TENANT_ID });

type Campus = { id: string; name: string; city: string | null };

/**
 * Desktop shell. Each role (owner, principal, accounts, HR, ...) will open on its own
 * Dhruva-prepared "Today" list; modules appear only when feature flags allow them.
 */
export function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [platformUp, setPlatformUp] = useState<boolean | null>(null);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [roleKey, setRoleKey] = useState(roles[0].key);
  const role = roles.find((r) => r.key === roleKey) ?? roles[0];

  useEffect(() => {
    api.health().then(() => setPlatformUp(true)).catch(() => setPlatformUp(false));
    api.campuses().then(setCampuses).catch(() => setCampuses([]));
  }, []);

  return (
    <div style={{ fontFamily: font.family, color: colors.text, padding: spacing.xl, maxWidth: 880, margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, color: colors.navy }}>{t('app.name', locale)}</h1>
          <p style={{ margin: 0, color: colors.textMuted }}>{t('app.tagline', locale)}</p>
        </div>
        <button onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')} style={{ borderRadius: radius.pill, padding: `${spacing.xs}px ${spacing.md}px` }}>
          {t('lang.switch', locale)}
        </button>
      </header>

      <p style={{ marginTop: spacing.lg }}>
        {t('status.platform', locale)}:{' '}
        <strong style={{ color: platformUp ? colors.status.onTrack : colors.status.attention }}>
          {platformUp === null ? '…' : t(platformUp ? 'status.up' : 'status.down', locale)}
        </strong>
      </p>

      <h2>{t('today.title', locale)}</h2>
      {campuses.length === 0 ? (
        <p style={{ color: colors.textMuted }}>{t('today.empty', locale)}</p>
      ) : (
        <ul>
          {campuses.map((c) => (
            <li key={c.id}>
              {c.name} {c.city ? `· ${c.city}` : ''}
            </li>
          ))}
        </ul>
      )}

      {/* Screen registry from @dhruva/navigation: every Functional Overview screen, tied to its spec requirement modules. */}
      <h2>Screens</h2>
      <label>
        Role{' '}
        <select value={roleKey} onChange={(e) => setRoleKey(e.target.value)}>
          {roles.map((r) => (
            <option key={r.key} value={r.key}>{r.label}</option>
          ))}
        </select>
      </label>
      <p style={{ color: colors.textMuted }}>Phone tabs: {role.phoneTabs.join(' · ') || 'none'}</p>
      <ul>
        {role.desktop.map((sc) => (
          <li key={sc.key}>
            {sc.label} <span style={{ color: colors.textMuted }}>· {sc.req.join(', ')}{sc.only ? ` · ${sc.only} only` : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
