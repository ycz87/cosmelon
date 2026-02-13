/**
 * useSync — cloud data sync hook
 *
 * Fire-and-forget sync: all cloud operations are async and non-blocking.
 * Failures are silently ignored (local-first approach).
 * Only active when user is authenticated.
 */
import { useState, useCallback, useRef } from 'react'
import { API_BASE } from './useAuth'
import type { PomodoroRecord, PomodoroSettings, Warehouse } from '../types'

const TOKEN_KEY = 'wc_access_token'

interface SyncState {
  isSyncing: boolean
  lastSyncAt: string | null
}

interface PullResult {
  hasData: boolean
  settings: PomodoroSettings | null
  records: PomodoroRecord[]
  warehouse: Warehouse | null
}

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

async function authFetch(path: string, options: RequestInit = {}): Promise<Response | null> {
  const token = getToken()
  if (!token) return null
  try {
    return await fetch(`${API_BASE}/api${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })
  } catch {
    return null
  }
}

export function useSync(isAuthenticated: boolean) {
  const [syncState, setSyncState] = useState<SyncState>({
    isSyncing: false,
    lastSyncAt: null,
  })
  const syncingRef = useRef(false)

  /** Push settings to cloud (fire-and-forget) */
  const syncSettings = useCallback((settings: PomodoroSettings) => {
    if (!isAuthenticated) return
    authFetch('/settings', {
      method: 'PUT',
      body: JSON.stringify({ settings }),
    }).catch(() => {})
  }, [isAuthenticated])

  /** Push a single record to cloud (fire-and-forget) */
  const syncRecord = useCallback((record: PomodoroRecord) => {
    if (!isAuthenticated) return
    authFetch('/records', {
      method: 'POST',
      body: JSON.stringify(record),
    }).catch(() => {})
  }, [isAuthenticated])

  /** Push warehouse to cloud (fire-and-forget) */
  const syncWarehouse = useCallback((warehouse: Warehouse) => {
    if (!isAuthenticated) return
    authFetch('/warehouse', {
      method: 'PUT',
      body: JSON.stringify({ warehouse }),
    }).catch(() => {})
  }, [isAuthenticated])

  /** Pull all data from cloud. Returns what was found. */
  const pullAll = useCallback(async (): Promise<PullResult> => {
    const empty: PullResult = { hasData: false, settings: null, records: [], warehouse: null }
    if (!isAuthenticated) return empty
    if (syncingRef.current) return empty

    syncingRef.current = true
    setSyncState(s => ({ ...s, isSyncing: true }))

    try {
      const [settingsRes, recordsRes, warehouseRes] = await Promise.all([
        authFetch('/settings'),
        authFetch('/records?limit=500'),
        authFetch('/warehouse'),
      ])

      let settings: PomodoroSettings | null = null
      let records: PomodoroRecord[] = []
      let warehouse: Warehouse | null = null
      let hasData = false

      if (settingsRes?.ok) {
        const data = await settingsRes.json() as { settings: PomodoroSettings | null }
        if (data.settings) {
          settings = data.settings
          hasData = true
        }
      }

      if (recordsRes?.ok) {
        const data = await recordsRes.json() as { records: PomodoroRecord[] }
        if (data.records && data.records.length > 0) {
          records = data.records
          hasData = true
        }
      }

      if (warehouseRes?.ok) {
        const data = await warehouseRes.json() as { warehouse: Warehouse | null }
        if (data.warehouse) {
          warehouse = data.warehouse
          hasData = true
        }
      }

      setSyncState({ isSyncing: false, lastSyncAt: new Date().toISOString() })
      return { hasData, settings, records, warehouse }
    } catch {
      setSyncState(s => ({ ...s, isSyncing: false }))
      return empty
    } finally {
      syncingRef.current = false
    }
  }, [isAuthenticated])

  /** Migrate local data to cloud (first login with no cloud data) */
  const migrateLocalData = useCallback(async (
    settings: PomodoroSettings,
    records: PomodoroRecord[],
    warehouse: Warehouse,
  ) => {
    if (!isAuthenticated) return

    try {
      // Push settings
      await authFetch('/settings', {
        method: 'PUT',
        body: JSON.stringify({ settings }),
      })

      // Batch push records
      if (records.length > 0) {
        await authFetch('/records/batch', {
          method: 'POST',
          body: JSON.stringify({ records }),
        })
      }

      // Push warehouse
      await authFetch('/warehouse', {
        method: 'PUT',
        body: JSON.stringify({ warehouse }),
      })
    } catch {
      // Silent fail — local data is still intact
    }
  }, [isAuthenticated])

  return {
    ...syncState,
    syncSettings,
    syncRecord,
    syncWarehouse,
    pullAll,
    migrateLocalData,
  }
}
