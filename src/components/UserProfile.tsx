/**
 * UserProfile — settings section: login prompt or user info with editing
 */
import { useState, useRef, useCallback } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useI18n } from '../i18n'
import type { User } from '../hooks/useAuth'

const AUTH_BASE = 'https://auth.cosmelon.app'
const TOKEN_KEY = 'wc_access_token'

interface UserProfileProps {
  user: User | null
  isLoading: boolean
  onLoginClick: () => void
  onLogout: () => void
  onUpdateProfile?: (data: { displayName?: string; avatarUrl?: string }) => void
}

function InitialAvatar({ email, displayName }: { email: string; displayName: string | null }) {
  const theme = useTheme()
  const letter = (displayName || email || '?')[0].toUpperCase()
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
      style={{
        backgroundColor: `${theme.accent}25`,
        color: theme.accent,
      }}
    >
      {letter}
    </div>
  )
}

function cropAndResize(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const size = Math.min(img.width, img.height)
      const sx = (img.width - size) / 2
      const sy = (img.height - size) / 2
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 256, 256)
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
        file.type === 'image/png' ? 'image/png' : 'image/jpeg',
        0.9,
      )
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

export function UserProfile({ user, isLoading, onLoginClick, onLogout, onUpdateProfile }: UserProfileProps) {
  const theme = useTheme()
  const i18n = useI18n()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isEditingName, setIsEditingName] = useState(false)
  const [editName, setEditName] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const getToken = () => localStorage.getItem(TOKEN_KEY)

  const handleSaveName = useCallback(async () => {
    if (!user || savingName) return
    const trimmed = editName.trim()
    if (!trimmed || trimmed === user.displayName) {
      setIsEditingName(false)
      return
    }
    setSavingName(true)
    try {
      const res = await fetch(`${AUTH_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ displayName: trimmed }),
      })
      if (res.ok) {
        onUpdateProfile?.({ displayName: trimmed })
      }
    } catch {
      // silent
    } finally {
      setSavingName(false)
      setIsEditingName(false)
    }
  }, [user, editName, savingName, onUpdateProfile])

  const handleAvatarSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    // Reset input so same file can be re-selected
    e.target.value = ''

    setUploadingAvatar(true)
    try {
      const blob = await cropAndResize(file)
      const formData = new FormData()
      formData.append('avatar', blob, `avatar.${file.type === 'image/png' ? 'png' : 'jpg'}`)

      const res = await fetch(`${AUTH_BASE}/auth/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      })
      if (res.ok) {
        const data = await res.json() as { avatarUrl: string }
        // Append cache-buster to force reload
        onUpdateProfile?.({ avatarUrl: `${data.avatarUrl}?t=${Date.now()}` })
      }
    } catch {
      // silent
    } finally {
      setUploadingAvatar(false)
    }
  }, [user, onUpdateProfile])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-3">
        <div
          className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: `${theme.accent}40`, borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  if (!user) {
    return (
      <button
        onClick={onLoginClick}
        className="w-full py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
        style={{
          backgroundColor: `${theme.accent}15`,
          color: theme.accent,
        }}
      >
        {i18n.authLoginToSync}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Avatar — clickable to upload */}
      <div
        className="relative w-10 h-10 shrink-0 cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
        title={i18n.profileUploadAvatar}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <InitialAvatar email={user.email} displayName={user.displayName} />
        )}
        {/* Upload overlay */}
        {uploadingAvatar ? (
          <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'white', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleAvatarSelect}
        />
      </div>

      {/* Name — click to edit */}
      <div className="flex-1 min-w-0">
        {isEditingName ? (
          <input
            autoFocus
            className="text-sm font-medium w-full bg-transparent border-b outline-none py-0.5"
            style={{ color: theme.text, borderColor: theme.accent }}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSaveName() }}
            onBlur={handleSaveName}
            disabled={savingName}
            maxLength={50}
          />
        ) : (
          <div
            className="text-sm font-medium truncate cursor-pointer group/name flex items-center gap-1"
            style={{ color: theme.text }}
            onClick={() => { setEditName(user.displayName || ''); setIsEditingName(true) }}
            title={i18n.profileEditName}
          >
            <span className="truncate">{user.displayName || user.email}</span>
            <span className="opacity-0 group-hover/name:opacity-60 transition-opacity text-xs">✏️</span>
          </div>
        )}
        {savingName ? (
          <div className="text-xs" style={{ color: theme.textMuted }}>{i18n.profileSaving}</div>
        ) : user.displayName ? (
          <div className="text-xs truncate" style={{ color: theme.textMuted }}>
            {user.email}
          </div>
        ) : null}
      </div>

      <button
        onClick={onLogout}
        className="px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
        style={{
          backgroundColor: theme.inputBg,
          color: theme.textMuted,
        }}
      >
        {i18n.authLogout}
      </button>
    </div>
  )
}
