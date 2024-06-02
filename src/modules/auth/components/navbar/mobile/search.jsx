import { useMutation } from "@tanstack/react-query";
import { MapPinIcon, PinIcon } from "lucide-react";
import React from "react";

import { SearchCategoryFn } from "../../../../category/query";
import { useCity } from "../../../../../context/CityContext";
import useToggle from "../../../../../hooks/useToggle";
import SearchResult from "./search_result";

const Search = ({ openCity, searchText }) => {
  const { city } = useCity();
  const [isSearchOpen, toggleIsSearchOpen] = useToggle(false);
  const searchMutation = useMutation({
    mutationFn: SearchCategoryFn,
  });
  const searchFn = (query) => searchMutation.mutateAsync(query);
  const openCityHandle = (event) => {
    event.stopPropagation();
    openCity();
  };
  const closeSearch = (event) => {
    event.stopPropagation();
    toggleIsSearchOpen();
  };
  return (
    <div className="w-full lg:w-[400px]" onClick={toggleIsSearchOpen}>
      <div className="w-full flex justify-between items-center bg-gray-100 px-4 py-[10px] rounded-lg border border-gray-300">
        {searchText ? (
          <span className="text-sm">{searchText}</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-primary-default">
              <PinIcon size={14} />
            </span>
            <span className="text-sm text-gray-500">جستجو در پونز</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="h-[26px] w-1 border-r border-gray-300"></div>
          <div className="flex gap-2 text-gray-500" onClick={openCityHandle}>
            <span className="text-xs">
              {city && city !== "" ? city : "شهر"}
            </span>
            <span>
              <MapPinIcon size={"14px"} />
            </span>
          </div>
        </div>
      </div>
      {isSearchOpen === true && (
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
