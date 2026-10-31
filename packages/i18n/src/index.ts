/** English and Hindi strings shared by every app. Add keys to `en` first; `hi` falls back to `en`. */
const en = {
  'app.name': 'DhruvaOne',
  'app.tagline': 'Learning, reimagined with AI.',
  'today.title': 'Today',
  'today.empty': 'Nothing waiting. Dhruva will add tasks as they come in.',
  'status.platform': 'Platform',
  'status.up': 'Connected',
  'status.down': 'Not reachable',
  'lang.switch': 'हिन्दी',
} as const;

export type Key = keyof typeof en;

const hi: Partial<Record<Key, string>> = {
  'app.name': 'ध्रुव वन',
  'app.tagline': 'एआई के साथ शिक्षा, नए रूप में।',
  'today.title': 'आज',
  'today.empty': 'अभी कुछ बाकी नहीं है। नए काम आने पर ध्रुव जोड़ देगा।',
  'status.platform': 'प्लेटफ़ॉर्म',
  'status.up': 'जुड़ा हुआ',
  'status.down': 'संपर्क नहीं हो पा रहा',
  'lang.switch': 'English',
};

export type Locale = 'en' | 'hi';

export function t(key: Key, locale: Locale = 'en'): string {
  return (locale === 'hi' ? hi[key] : undefined) ?? en[key];
}
