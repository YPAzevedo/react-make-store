# react-make-store

> 📦 State management for React.

[![NPM](https://img.shields.io/npm/v/react-make-store.svg)](https://www.npmjs.com/package/react-make-store) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-make-store
```

## Usage

```jsx
import React from 'react';

import makeStore, { useStore } from 'react-make-store';

const stores = makeStore();

const nameStore = stores.create("name", "John Doe")

function App() {
  const [name, update] = useStore(nameStore)

  return <div>{name}</div>
}
```

## License

MIT © [YPAzevedo](https://github.com/YPAzevedo)
