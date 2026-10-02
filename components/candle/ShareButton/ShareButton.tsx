'use client'

import { useState } from 'react'
import { LuCheck, LuShare } from 'react-icons/lu'

// Shares the page with the phone's share sheet, or copies the link.
const ShareButton = ({
  title,
  className,
  label,
}: {
  title: string
  className?: string
  label?: string
}) => {
  const [copied, setCopied] = useState(false)
  const share = async () => {
    const url = window.location.href.split('#')[0]
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // The visitor closed the share sheet.
    }
  }
  return (
    <button
      type="button"
      className={className}
      onClick={share}
      aria-label={label ? undefined : 'Share'}
    >
      {copied ? (
        <LuCheck aria-hidden="true" />
      ) : (
        <LuShare aria-hidden="true" />
      )}
      {label && <span>{copied ? 'Link copied' : label}</span>}
    </button>
  )
}

export default ShareButton
