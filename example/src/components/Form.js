import React from 'react'
import  { useDeriveFromSlice } from 'react-make-store'

import StyleBox from './StyleBox'
import FormField from './FormField'

import { formStore } from '../store'


export default function Form({ name, ...props }) {
  const [isOlderThen18] = useDeriveFromSlice(formStore, "age", (ageValue) => Number(ageValue) >= 18)
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        alert(JSON.stringify(formStore.value(), null, 2))
      }}
      {...props}
    >
      <StyleBox display='grid' placeItems='center' gridGap='20px'>
        <FormField name='firstName' />
        <FormField name='lastName' />
        <FormField name='age' type="number" />
        <StyleBox>
          <span role="img" aria-label="emoji">{!isOlderThen18 ? "👶🏻" : "👴🏼"}</span>
        </StyleBox>
        <button type='submit'>Submit</button>
      </StyleBox>
    </form>
  )
}
