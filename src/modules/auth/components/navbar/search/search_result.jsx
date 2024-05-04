import { CircularProgress } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PopularSearch from "./popular_search";

const SearchResult = ({ searchData }) => {
  return (
    <>
      {searchData?.data ? (
        <>
          {searchData?.isSuccess ? (
            <div className="w-full flex flex-col gap-0">
              {searchData?.data?.length ? (
                searchData?.data?.map((value, index) => (
                  <Link
                    className="flex flex-col gap-2 p-4 hover:bg-gray-100 w-full border-b"
                    to={`/s/${value.slug}`}
                    key={index}
                  >
                    <span className="text-gray-800 text-sm">{value.name}</span>
                    {value.parent && (
                      <span className="text-gray-400 text-xs">
                        در {value.parent.name}
                      </span>
                    )}
                  </Link>
                ))
              ) : (
                <div className="flex flex-col gap-2 p-4 hover:bg-gray-100 w-full border-b">
                  نتیجه ای یافت نشد !!
                </div>
              )}
            </div>
          ) : (
            <CircularProgress />
          )}
        </>
      ) : (
        <PopularSearch />
      )}
    </>
  );
};
export default SearchResult;
