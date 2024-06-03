import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [state, setstate] = useState(initialValue);
  const toggle = setstate.bind(this, !state);

  return [state, toggle];
};
export default useToggle;
