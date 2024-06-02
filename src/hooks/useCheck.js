import { useState } from "react";

const useCheck = (initialValue = false) => {
  const [state, setstate] = useState(initialValue);
  const setTrue = setstate.bind(this, true);
  const setFalse = setstate.bind(this, false);

  return [state, setTrue, setFalse];
};
export default useCheck;
