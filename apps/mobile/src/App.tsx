import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { createClient } from '@dhruva/api-client';
import { colors, spacing } from '@dhruva/design-tokens';
import { t, type Locale } from '@dhruva/i18n';

const extra = (Constants.expoConfig?.extra ?? {}) as { platformUrl?: string; devTenantId?: string };
const api = createClient({ baseUrl: extra.platformUrl ?? 'http://localhost:3000', devTenantId: extra.devTenantId });

/**
 * One app for every phone role (parent, teacher, staff, student, bus attendant) with profile
 * switching. Attendance and bus taps must queue on the device and retry with the same request ID.
 */
export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [up, setUp] = useState<boolean | null>(null);

  useEffect(() => {
    api.health().then(() => setUp(true)).catch(() => setUp(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <View style={{ padding: spacing.lg, gap: spacing.md }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.navy }}>{t('app.name', locale)}</Text>
        <Text style={{ color: colors.textMuted }}>{t('app.tagline', locale)}</Text>
        <Text>
          {t('status.platform', locale)}: {up === null ? '…' : t(up ? 'status.up' : 'status.down', locale)}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>{t('today.title', locale)}</Text>
        <Text style={{ color: colors.textMuted }}>{t('today.empty', locale)}</Text>
        <Pressable onPress={() => setLocale(locale === 'en' ? 'hi' : 'en')}>
          <Text style={{ color: colors.status.fine }}>{t('lang.switch', locale)}</Text>
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
