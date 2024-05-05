import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SearchCategoryFn } from "../../../../category/query";
import SearchMobile from "./mobile";
import SearchDektop from "./desktop";
import { useCity } from "../../../../../context/CityContext";
import { TextField } from "@mui/material";
import Button from "../../../../../shared/components/button";
import { MapPinIcon } from "lucide-react";

const Search = ({ open, onOpen, onClose, isMobile, openCity }) => {
  const { city } = useCity();
  const searchMutation = useMutation({
    mutationFn: SearchCategoryFn,
  });
  const searchFn = (query) => searchMutation.mutateAsync(query);

  return (
    <div className="lg:w-[400px]">
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        placeholder="جستجو در همه آگهی ها"
        className="!bg-gray-100"
        sx={{
          "& fieldset": { border: "none" },
          borderRadius: "0.3rem",
        }}
        id="fullWidth"
        onFocus={onOpen}
        onChange={(e) => searchFn(e.target.value)}
        InputProps={{
          endAdornment: (
            <div className="flex flex-row  items-center">
              <div className="h-[20px] w-1 border-r border-gray-300"></div>
              <Button
                size="small"
                variant="textonly"
                className="w-max"
                leftIcon={<MapPinIcon size={"16px"} />}
                onClick={openCity}
              >
                {city && city !== "" ? city : "شهر"}
              </Button>
            </div>
          ),
        }}
      />
      {/*  */}
      {/* {isMobile ? (
        <SearchMobile
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          searchFn={searchFn}
          searchData={searchMutation}
        />
      ) : (
        <SearchDektop
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          searchFn={searchFn}
          searchData={searchMutation}
        />
      )} */}
    </div>
  );
};
export default Search;
