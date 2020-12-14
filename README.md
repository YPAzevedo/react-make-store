# 📦 react-make-store

> State management for React, with global stores.

[![NPM](https://img.shields.io/npm/v/react-make-store.svg)](https://www.npmjs.com/package/react-make-store) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-make-store
```

## About

A simple way to set up stores and share state between components, RMS state lives outside React, so you can dispatch state updates from outside React components and with with the hooks, we bring the store state from RMS to React. You'll be able to read and write, you can choose to the stores you want to listen to, you can listen to only a slice of the store and you can also derive state from the store or a slice of it. More similar to Redux and Zustand.

## Demos

Here are some codesandbox demos:
- https://codesandbox.io/s/react-make-store-derive-demo-dfmg8
- https://codesandbox.io/s/react-make-store-demo-r0urd
- https://codesandbox.io/s/react-make-store-form-demo-84x4u

## makeStore

Let's you create an instance of stores where you can hold all of your stores, you can have multiple makeStores instance, if you want some separation of concerns. It accepts an object as the first parameter too for you to set up you stores without needing to use the `create` method.

```jsx
import React from 'react';

import makeStore, { useStore } from 'react-make-store';

const stores = makeStore({
  favoriteColor: "blue",
});

const favoriteAnimalStore = stores.create("favoriteAnimal", "🐕")
const favoriteColorStore = stores.get("favoriteColor")

function App() {
  const [favoriteAnimal, update] = useStore(favoriteAnimalStore)
  const [favoriteColor, update] = useStore(favoriteColorStore)

  return <div>your favorite animal is, {favoriteAnimal} and color is, {favoriteColor}</div>
}
```

## useStore Hook

The `useStore` hook let's you subscribe to a store state, so if there are any changes to that store your component will know about and re-render. We also expose a update function so you can dispatch updates to that store that will reflect in any other components reading from this store.

```jsx
import React from 'react';

import makeStore, { useStore } from 'react-make-store';

const stores = makeStore();

const ageStore = stores.create("age", 30)

function App() {
  const [age, update] = useStore(ageStore)

  return <input type="number" value={age} onChange={event => update(event.target.value)} />
}
```

## useDeriveFromStore Hook

The `useDeriveFromStore` hook let's you create a state derived from a store value, if the store value changes, causing the derived state to change then your component re-renders, we also expose a update function, but that will only affect the derived state not the store state.

```jsx
import React from 'react';

import makeStore, { useStore } from 'react-make-store';

const stores = makeStore();

const ageStore = stores.create("age", 30)

function App() {
  const [isOldEnough] = useDeriveFromStore(ageStore, (ageValue) => ageValue >= 18)

  return <span>Is 18+: {String(isOldEnough)}</span>
}
```

## useSliceOfStore Hook

The `useSliceOfStore` hook let's you subscribe and update on a slice of a store, similar to `useStore`, your component will only re-render if that specific slice of the state changes, the update function exposed will only be able to update that slice of the store.

```jsx
import React from 'react';

import makeStore, { useStore } from 'react-make-store';

const stores = makeStore();

const formStore = stores.create("form", { fisrtName: "John", lastName: "Doe" })

function App() {
  const [firstName, update] = useSliceOfStore(formStore, "firstName")

  return <input type="text" value={firstName} onChange={event => update(event.target.value)} />
}
```

## useDeriveFromSlice Hook

The `useDeriveFromSlice` similar to the `useDeriveFromStore` in every way, only difference is that you can listen to only a slice of the store and derive your state from that. Component only will re-render if the derived state changes.

```jsx
import React from 'react';

import makeStore, { useStore } from 'react-make-store';

const stores = makeStore();

const formStore = stores.create("form", { favoriteAnimal: "🐈", favoriteColor: "yellow" })

function App() {
  const [isCatPerson] = useSliceOfStore(formStore, "favoriteAnimal", (favoriteAnimalValue) => favoriteAnimalValue === "🐈")

  return <span>{isCatPerson ? "❌" : "✅"}</span>
}
```

## License

MIT © [YPAzevedo](https://github.com/YPAzevedo)
