import { useState } from "react";

export function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  function toggleOpen() {
    return setIsOpen(!isOpen);
  }

  return [isOpen, toggleOpen];
}
