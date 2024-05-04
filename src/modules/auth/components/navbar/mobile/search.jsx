import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useCity } from "../../../../../context/CityContext";
import { TextField } from "@mui/material";
import Button from "../../../../../shared/components/button";
import { SearchCategoryFn } from "../../../../category/query";
import { MapPinIcon } from "lucide-react";
import SearchResult from "./search_result";

const Search = ({ openCity }) => {
  const { city } = useCity();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Search
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const searchMutation = useMutation({
    mutationFn: SearchCategoryFn,
  });
  const searchFn = (query) => searchMutation.mutateAsync(query);

  return (
    <div className="w-full lg:w-[400px]">
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
        autoComplete="off"
        onClick={openSearch}
        focused
        InputProps={{
          endAdornment: (
            <div className="flex flex-row  items-center">
              <div className="h-[20px] w-1 border-r border-gray-300"></div>
              <Button
                size="small"
                variant="textonly"
                className="w-max"
                leftIcon={<MapPinIcon size={"16px"} />}
                onClick={(event) => {
                  event.stopPropagation();
                  openCity();
                }}
              >
                {city && city !== "" ? city : "شهر"}
              </Button>
            </div>
          ),
          readOnly: true,
        }}
      />
      {isSearchOpen && (
        <SearchResult
          searchFn={searchFn}
          closeSearch={closeSearch}
          searchMutation={searchMutation}
        />
      )}
    </div>
  );
};
export default Search;
