'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { Church, isChurch } from '../utils/site'

// The visitor's tradition lives in the browser (localStorage), never on
// the server, so every page can be built ahead of time. The server and
// the first browser render both use "all" (Both traditions); the saved
// choice then replaces it.
//
// Order of precedence: the ?church= address parameter (shared links
// show what the sender saw), the saved choice, the old
// "findasaint.com" cookie, then "all".

const KEY = 'findasaint.tradition'
const LEGACY_COOKIE = 'findasaint.com'

type State = { church: Church; asked: boolean }

// "asked" is true here so the welcome card is not in the static HTML.
const SERVER_STATE: State = { church: 'all', asked: true }

const listeners = new Set<() => void>()
let memory: State | null = null
let signature = ''
let snapshot: State = SERVER_STATE
let fromUrl: Church | null | undefined

const urlChurch = () => {
  if (fromUrl === undefined) {
    const value = new URLSearchParams(window.location.search).get(
      'church',
    )
    fromUrl = isChurch(value) ? value : null
  }
  return fromUrl
}

const legacyChurch = (): Church | null => {
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LEGACY_COOKIE}=([^;]*)`),
    )
    if (!match) return null
    const data = JSON.parse(decodeURIComponent(match[1]))
    return isChurch(data?.church) ? data.church : null
  } catch {
    return null
  }
}

const read = (): State => {
  let raw = ''
  try {
    raw = window.localStorage.getItem(KEY) || ''
  } catch {
    // Storage is blocked (private mode). `memory` keeps the choice.
  }
  const url = urlChurch()
  const legacy = raw ? null : legacyChurch()
  const key = `${raw}|${url}|${legacy}|${memory?.church}`
  if (key === signature) return snapshot
  signature = key

  let stored: Partial<State> = {}
  try {
    stored = raw ? JSON.parse(raw) : {}
  } catch {
    stored = {}
  }
  const saved = isChurch(stored.church) ? stored.church : null

  snapshot = memory && !raw
    ? { church: url ?? memory.church, asked: true }
    : {
        church: url ?? saved ?? legacy ?? 'all',
        asked: Boolean(stored.asked) || Boolean(legacy) || url !== null,
      }
  return snapshot
}

const subscribe = (callback: () => void) => {
  listeners.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

const write = (next: State) => {
  memory = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Blocked storage: the choice lasts until the page is closed.
  }
  // A choice made here beats an old ?church= parameter.
  fromUrl = null
  listeners.forEach((listener) => listener())
}

export const useTradition = () => {
  const state = useSyncExternalStore(subscribe, read, () => SERVER_STATE)

  const setChurch = useCallback(
    (church: Church) => write({ church, asked: true }),
    [],
  )
  // Close the welcome card and keep "Both traditions".
  const dismiss = useCallback(
    () => write({ church: read().church, asked: true }),
    [],
  )

  return {
    church: state.church,
    asked: state.asked,
    setChurch,
    dismiss,
  }
}
