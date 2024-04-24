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
  fullWidth = true,
  autoFocus = false,
}) => {
  return (
    <label className="flex flex-col gap-3 w-full">
      {label && (
        <div className="label">
          <span className="label-text text-gray-800 text-base py-10">
            {label}
          </span>
        </div>
      )}
      {helperText && (
        <div className="label p-0">
          <span className="label-text-alt pb-4 leading-6 text-xs text-gray-400">
            {helperText}
          </span>
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
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        className="Fanum"
        dir="rtl"
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
            <MenuItem
              dir="rtl"
              className="Fanum"
              key={index}
              value={value.name}
            >
              {value.name}
            </MenuItem>
          ))}
      </TextField>
      <div className="text-xs text-red-600 ">{errorMessage ?? ""}</div>
    </label>
  );
};
export default TextInput;
