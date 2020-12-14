import { useCallback, useLayoutEffect, useRef } from 'react'

export default function useEffectCallback(callback) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  return useCallback((...args) => callbackRef.current(...args), [])
}
