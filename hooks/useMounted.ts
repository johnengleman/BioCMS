import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// False on the server and during hydration, true in the browser after.
// Use it for anything that depends on the visitor's clock or settings,
// so the static HTML and the first browser render match.
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
