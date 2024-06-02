import React from "react";

import TextInput from "../../../shared/components/input/textInput";

const OptionComponent = ({
  _id,
  type,
  register,
  title,
  enum: list,
  required,
  defaultValue = "",
}) => {
  return (
    <>
      {list.length > 0 && list[0] !== "" ? (
        <TextInput
          label={title}
          placeholder={title}
          register={register(_id)}
          required={required ?? false}
          select
          value={defaultValue}
        >
          {list.map((value) => ({ name: value }))}
        </TextInput>
      ) : (
        <TextInput
          label={title}
          placeholder={title}
          register={register(_id)}
          required={required ?? false}
          type={type === "currency" ? "number" : undefined}
          prefix={type === "currency" ? "تومان" : undefined}
          value={defaultValue}
        />
      )}
    </>
  );
};

export default OptionComponent;
