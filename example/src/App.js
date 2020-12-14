import React from 'react'

import Title from './components/Title'
import ColorField from './components/ColorField'
import StyleBox from './components/StyleBox'
import Form from './components/Form'

const App = () => {
  return <StyleBox display="grid" placeItems="center" gridGap="20px" >
    <Title/>
    <ColorField />
    <Form/>
  </StyleBox>
}

export default App
