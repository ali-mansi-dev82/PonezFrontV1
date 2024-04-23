import React from "react";
import TextInput from "../../../shared/components/input/textInput";
import { Chip, InputAdornment } from "@mui/material";

const OptionComponent = ({ type, register, title, enum: list, required }) => {
  return (
    <>
      {list.length > 0 && list[0] !== "" ? (
        <TextInput
          label={title}
          placeholder={title}
          register={register(title)}
          required={required ?? false}
          select
        >
          {list.map((value) => ({ name: value }))}
        </TextInput>
      ) : (
        <TextInput
          label={title}
          placeholder={title}
          register={register(title)}
          required={required ?? false}
          type={type === "currency" ? "number" : undefined}
          prefix={type === "currency" ? "تومان" : undefined}
        />
      )}
    </>
  );
};

export default OptionComponent;
