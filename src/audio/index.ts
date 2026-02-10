/**
 * Audio system — public API
 * Replaces the old notification.ts
 */
export { getCtx, setMasterAlertVolume, setMasterAmbienceVolume } from './context';
export { playAlertOnce, playAlertRepeated, stopAlert, ALL_ALERT_IDS, ALERT_CYCLE_DURATION } from './alerts/sounds';
export type { AlertSoundId } from './alerts/sounds';
export {
  ALL_AMBIENCE_SOUNDS,
  defaultMixerConfig,
  startAmbienceSound, stopAmbienceSound, setAmbienceSoundVolume,
  applyMixerConfig, stopAllAmbience, isAmbiencePlaying,
  getActiveSoundsSummary,
  enterPreviewMode, exitPreviewMode,
} from './mixer';
export type { AmbienceSoundId, AmbienceSoundConfig, AmbienceMixerConfig, AmbienceSoundMeta } from './mixer';

// ─── Browser notification (kept from old system) ───

export function requestNotificationPermission(): void {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function sendBrowserNotification(title: string, body: string): void {
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      // On Android Chrome, `new Notification()` throws TypeError —
      // notifications must go through ServiceWorker.showNotification().
      // Try SW first, fall back to direct constructor for desktop browsers.
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, { body });
        }).catch(() => { /* SW not available */ });
      } else {
        new Notification(title, { body });
      }
    }
  } catch {
    // Notification API not available or threw — silently ignore
  }
}
