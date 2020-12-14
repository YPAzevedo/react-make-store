import React from 'react'

export default function StyleBox({ children, ...props }) {
  return <div style={props}>{children}</div>
}
