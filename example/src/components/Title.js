import React from "react";
import { useStore } from 'react-make-store'

import { colorStore } from "../store";

export default function Title() {
  const [color] = useStore(colorStore);

  return (
    <h1 style={{ color }}>
      <span role="img" aria-label="box">
        📦
      </span>
      {" react-make-store"}
    </h1>
  );
}
