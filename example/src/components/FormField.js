import React from 'react'
import { useSliceOfStore } from 'react-make-store'
import { formStore } from '../store'

import StyleBox from './StyleBox'

export default function FormField ({ name, ...props }) {
  const [fieldValue, update] = useSliceOfStore(formStore, name)

  return (
    <StyleBox>
      <label htmlFor={name} >{name}: </label>
      <input
        name={name}
        value={fieldValue}
        onChange={(event) => update(event.target.value)}
        placeholder={name}
        {...props}
      />
    </StyleBox>
  )
}
