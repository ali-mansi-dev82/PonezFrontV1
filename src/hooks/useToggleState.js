import { useState } from "react";

const useToggleState = (initialValue = false) => {
  const [state, setstate] = useState(initialValue);
  const setTrue = setstate.bind(this, true);
  const setFalse = setstate.bind(this, false);

  return [state, setTrue, setFalse];
};
export default useToggleState;
