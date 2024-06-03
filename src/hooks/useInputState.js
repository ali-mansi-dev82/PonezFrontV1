import { useState } from "react";

const useInputState = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (item) => setValue(item?.target?.value);
  const reset = setValue.bind(this, "");

  return [value, handleChange, reset];
};
export default useInputState;
