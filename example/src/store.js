import makeStore from 'react-make-store'

const stores = makeStore()

export const colorStore = stores.create("color", "#DC87EF")

export const formStore = stores.create("form", { firstName: "John", lastName: "Doe", age: 18  })
