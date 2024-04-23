import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import PopularSearch from "./popular_search";
import Spinner from "../../../../shared/components/spiner";
import { SearchCategoryFn } from "../../../category/query";

const Search = () => {
  const [open, setOpen] = useState(false);

  const searchMutation = useMutation({
    mutationFn: SearchCategoryFn,
  });

  return (
    <>
      <div className="relative w-max">
        <label className="input input-bordered flex w-[440px] items-center py-2 h-10 gap-2 text-gray-400 bg-gray-100 border-none">
          <SearchIcon size={14} />
          <input
            type="text"
            className="grow text-xs"
            placeholder="جستجو در همه آگهی ها"
            onFocus={() => setOpen(true)}
            onChange={(e) => searchMutation.mutateAsync(e.target.value)}
          />
        </label>
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              className="fixed top-[64px] left-0 right-0 bottom-0 bg-black bg-opacity-25 z-0"
            ></div>
            <div className="absolute left-0 top-[130%] max-h-[60vh] overflow-y-auto flex gap-4 right-0 bg-white z-30 rounded-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
              {searchMutation?.data ? (
                <>
                  {searchMutation?.isSuccess ? (
                    <div className="w-full flex flex-col gap-0">
                      {searchMutation?.data?.length ? (
                        searchMutation?.data?.map((value, index) => (
                          <Link
                            className="flex flex-col gap-2 p-4 hover:bg-gray-100 w-full border-b"
                            to={`/s/${value.slug}`}
                            onClick={() => setOpen(false)}
                            key={index}
                          >
                            <span className="text-gray-800 text-sm">
                              {value.name}
                            </span>
                            {value.parent && (
                              <span className="text-gray-400 text-xs">
                                در {value.parent.name}
                              </span>
                            )}
                          </Link>
                        ))
                      ) : (
                        <div className="flex flex-col gap-2 p-4 hover:bg-gray-100 w-full border-b">نتیجه ای یافت نشد !!</div>
                      )}
                    </div>
                  ) : (
                    <Spinner />
                  )}
                </>
              ) : (
                <PopularSearch />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Search;
