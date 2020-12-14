import React from "react";
import  { useStore } from 'react-make-store'

import { colorStore } from "../store";


export default function ColorField() {
  const [color, update] = useStore(colorStore, "color");

  return (
    <div>
      <strong>Color: {color}</strong>
      <input
        type="color"
        value={color}
        onChange={(e) => update(e.target.value)}
      />
    </div>
  );
}
