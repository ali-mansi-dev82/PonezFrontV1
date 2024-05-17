import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SearchCategoryFn } from "../../../../category/query";
import { useCity } from "../../../../../context/CityContext";
import { TextField } from "@mui/material";
import Button from "../../../../../shared/components/button";
import { MapPinIcon } from "lucide-react";
import SearchResult from "./search_result";

const Search = ({ open, onOpen, onClose, openCity, searchText }) => {
  const { city } = useCity();
  const searchMutation = useMutation({
    mutationFn: SearchCategoryFn,
  });
  const searchFn = (query) => searchMutation.mutateAsync(query);

  return (
    <div className="w-[400px] relative">
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        defaultValue={searchText}
        placeholder="جستجو در پونز"
        sx={{
          "& fieldset": { border: "none" },
          border: "1px solid #D1D5DB",
          bgcolor: "#F3F4F6",
          borderRadius: "8px",
          fontSize: 10,
          borderColor: "#E5E7EB",
          fontStyle: "normal",
        }}
        onFocus={onOpen}
        autoComplete="off"
        onChange={(e) => searchFn(e.target.value)}
        InputProps={{
          endAdornment: (
            <div className="flex flex-row  items-center">
              <div className="h-[20px] w-1 border-r border-gray-300"></div>
              <Button
                size="small"
                variant="textonly"
                className="w-max pl-0 pr-4 gap-1"
                rightIcon={<MapPinIcon size={12} />}
                onClick={openCity}
              >
                {city && city !== "" ? city : "شهر"}
              </Button>
            </div>
          ),
        }}
      />
      {open && (
        <SearchResult searchMutation={searchMutation} onClose={onClose} />
      )}
    </div>
  );
};
export default Search;
