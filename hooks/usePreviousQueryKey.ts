import { useState, useEffect } from 'react'

function usePreviousQueryKey() {
  const [prevQueryKey, setPrevQueryKey] = useState(null)

  const updateQueryKey = (newQueryKey) => {
    setPrevQueryKey(newQueryKey)
  }

  return [prevQueryKey, updateQueryKey]
}

export default usePreviousQueryKey
