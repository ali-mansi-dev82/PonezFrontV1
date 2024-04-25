import { TextField } from "@mui/material";
import React from "react";
import Button from "../../../../../shared/components/button";
import { MapPinIcon } from "lucide-react";

const NavbarMobile = ({ city, selectCity, setSelectCity }) => {
  return (
    <div className="w-full py-3">
      <div className="h-full">
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          placeholder="جستجو در همه آگهی ها"
          className="!bg-gray-100 !text-xs !placeholder:text-xs"
          sx={{
            "& fieldset": { border: "none" },
            borderRadius: "0.3rem",
            fontSize: "10px",
          }}
          id="fullWidth"
          // onFocus={() => setOpen(true)}
          // onChange={(e) => searchMutation.mutateAsync(e.target.value)}
          InputProps={{
            endAdornment: (
              <div className="flex flex-row gap-1 border-r border-gray-300">
                <Button
                  size="small"
                  variant="textonly"
                  className="w-max"
                  leftIcon={<MapPinIcon size={"16px"} />}
                  onClick={() => setSelectCity(true)}
                >
                  {city && city !== "" ? city : "شهر"}
                </Button>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};
export default NavbarMobile;
