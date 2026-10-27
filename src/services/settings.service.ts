import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { AppSettings } from '@/types'

const DEFAULT_SETTINGS: AppSettings = {
  defaultCurrency: 'INR (₹)',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '12-hour (hh:mm A)',
  enableNotifications: true,
  showAnalytics: true,
  appVersion: '0.1.0',
}

export async function getAppSettings(): Promise<AppSettings> {
  try {
    const snap = await getDoc(doc(db, 'settings', 'general'))
    if (!snap.exists()) {
      return DEFAULT_SETTINGS
    }
    return { ...DEFAULT_SETTINGS, ...snap.data() } as AppSettings
  } catch (err) {
    console.warn('[Settings] Error fetching settings:', err)
    return DEFAULT_SETTINGS
  }
}

export async function saveAppSettings(settings: Partial<AppSettings>): Promise<void> {
  try {
    await setDoc(
      doc(db, 'settings', 'general'),
      {
        ...settings,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )
  } catch (err) {
    console.warn('[Settings] Error saving settings:', err)
  }
}
