import { useCallback, useEffect, useState } from 'react'

import { useEffectCallback } from './utils'

// JavaScript API 🔩
export default function makeStore(initialStore = {}) {
  const stores = new Map(Object.entries(initialStore))

  const storeSubscriptions = new Map()

  function create(storeName, initalValue) {
    if (stores.has(storeName)) {
      throw new Error("Can't create. A store with this name already exists.")
    }

    stores.set(storeName, initalValue)

    return get(storeName)
  }

  function subscribe(storeName, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Subscribe needs a callback as second parameter.')
    }

    if (!stores.has(storeName)) {
      throw new Error("Can't create subsciption to a store that doesn't exist.")
    }

    if (!storeSubscriptions.get(storeName)) {
      storeSubscriptions.set(storeName, new Set())

      storeSubscriptions.get(storeName).add(callback)
    } else {
      storeSubscriptions.get(storeName).add(callback)
    }
    return {
      unsubscribe: () => {
        storeSubscriptions.get(storeName).delete(callback)
      },
      read: () => {
        return stores.get(storeName)
      }
    }
  }

  function update(storeName, newValue) {
    if (!stores.has(storeName)) {
      throw new Error("Can't update a store that doesn't exist.")
    }

    const updatedValue =
      typeof newValue === 'function'
        ? newValue(stores.get(storeName))
        : newValue

    stores.set(storeName, updatedValue)

    storeSubscriptions.get(storeName).forEach((fn) => fn(updatedValue))

    return stores.get(storeName)
  }

  function get(storeName) {
    return {
      value: () => stores.get(storeName),
      subscribe: (callback) => subscribe(storeName, callback),
      update: (newValue) => update(storeName, newValue)
    }
  }

  return {
    create,
    subscribe,
    update,
    get
  }
}
// makeStore React API ⚛️
// useStore 📦
export function useStore(store) {
  const [storeState, setStoreState] = useState(store.value())

  useEffect(() => {
    const subscription = store.subscribe((storeValue) => {
      setStoreState(storeValue)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [store])

  return [storeState, store.update]
}
// useSliceOfStore 🔪📦
export function useSliceOfStore(store, slice) {
  const [storeSlice, setStoreSlice] = useState(store.value()[slice])

  useEffect(() => {
    const subscription = store.subscribe(
      (storeValue) => {
        setStoreSlice((storeSlice) => {
          if (!Object.is(storeSlice, storeValue[slice])) {
            return storeValue[slice]
          }
          return storeSlice
        })
      },
      [store, slice]
    )

    return () => {
      subscription.unsubscribe()
    }
  })

  const updateSlice = useCallback(
    (newValue) => {
      store.update((storeValue) => ({
        ...storeValue,
        [slice]:
          typeof newValue === 'function'
            ? newValue(storeValue[slice])
            : newValue
      }))
    },
    [slice, store]
  )

  return [storeSlice, updateSlice]
}
// useDeriveFromStore 🧬📦
export function useDeriveFromStore(store, callback) {
  const [derivedState, setDerivedState] = useState(() =>
    callback(store.value())
  )

  const stableCallback = useEffectCallback(callback)

  useEffect(() => {
    const subscription = store.subscribe((storeValue) => {
      setDerivedState(stableCallback(storeValue))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [store])

  return [derivedState, setDerivedState]
}
// useDeriveFromSlice 🧬🔪📦
export function useDeriveFromSlice(store, slice, callback) {
  const [derivedSliceState, setDerivedSliceState] = useState(() =>
    callback(store.value()[slice])
  )

  const stableCallback = useEffectCallback(callback)

  useEffect(() => {
    const subscription = store.subscribe((storeValue) => {
      setDerivedSliceState(stableCallback(storeValue[slice]))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [store, slice, callback])

  return [derivedSliceState, setDerivedSliceState]
}
