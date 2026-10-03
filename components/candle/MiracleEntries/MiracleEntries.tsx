'use client'

import { useEffect } from 'react'

const open = (entry: Element, value: boolean) => {
  entry.toggleAttribute('data-open', value)
  entry
    .querySelector('[data-toggle]')
    ?.setAttribute('aria-expanded', String(value))
}

// Opens and closes the miracle accounts in #miracle-list. Each account
// shows its title and two lines until opened. Without this script the
// list stays fully open (the CSS waits for data-ready).
const MiracleEntries = () => {
  useEffect(() => {
    const listEl = document.getElementById('miracle-list')
    if (!listEl) return

    // A link to one account (/miracles#m-012) opens it.
    const openFromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1))
      const target = id && document.getElementById(id)
      const entry = target && target.closest('[data-miracle]')
      if (entry) open(entry, true)
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Links and selected text keep their normal behavior.
      if (target.closest('a')) return
      if (window.getSelection()?.toString()) return
      const entry = target.closest('[data-miracle]')
      if (!entry) return
      // An open account closes only from its arrow button.
      const fromToggle = Boolean(target.closest('[data-toggle]'))
      const isOpen = entry.hasAttribute('data-open')
      if (isOpen && !fromToggle) return
      open(entry, !isOpen)
    }

    listEl.setAttribute('data-ready', '')
    openFromHash()
    listEl.addEventListener('click', onClick)
    window.addEventListener('hashchange', openFromHash)
    return () => {
      listEl.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', openFromHash)
    }
  }, [])

  return null
}

export default MiracleEntries
