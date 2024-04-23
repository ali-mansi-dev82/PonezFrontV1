import { Chip, InputAdornment, MenuItem, TextField } from "@mui/material";
import React from "react";

const TextInput = ({
  children,
  register,
  label,
  size = "small",
  errorMessage = null,
  placeholder = "",
  helperText,
  type = "text",
  multiline = false,
  required = false,
  select = false,
  // InputProps = null,
  value = "",
  prefix = undefined,
}) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text text-gray-800 text-base mb-2">
            {label}
          </span>
        </div>
      )}
      {helperText && (
        <div className="label p-0">
          <span className="label-text-alt pb-2 leading-6">{helperText}</span>
        </div>
      )}
      <TextField
        {...register}
        error={errorMessage}
        variant="outlined"
        autoComplete="off"
        size={size}
        placeholder={placeholder}
        type={type}
        multiline={multiline}
        rows={multiline && 5}
        required={required}
        select={select}
        InputProps={
          prefix
            ? {
                endAdornment: (
                  <InputAdornment position="start">
                    <Chip label={prefix} size="small" sx={{ marginLeft: 1 }} />
                  </InputAdornment>
                ),
              }
            : undefined
        }
        defaultValue={value}
      >
        {select &&
          children.map((value, index) => (
            <MenuItem key={index} value={value.name}>
              {value.name}
            </MenuItem>
          ))}
      </TextField>
      <div className="text-xs text-red-600 py-2">{errorMessage ?? ""}</div>
    </label>
  );
};
export default TextInput;
