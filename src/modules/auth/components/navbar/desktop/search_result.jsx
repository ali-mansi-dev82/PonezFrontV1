import React from "react";
import { Link } from "react-router-dom";
import PopularSearch from "../search/popular_search";
import Spinner from "../../../../../shared/components/spiner";

const SearchResult = ({ searchMutation, onClose }) => {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed top-[64px] left-0 right-0 bottom-0 bg-black bg-opacity-25 z-0"
      ></div>
      <div className="absolute left-0 top-[110%] max-h-[60vh] overflow-y-auto flex gap-4 right-0 bg-white z-30 rounded-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
        {searchMutation?.data ? (
          <>
            {searchMutation?.isSuccess ? (
              <div className="w-full flex flex-col gap-0">
                {searchMutation?.data?.length ? (
                  searchMutation?.data?.map((value, index) => (
                    <Link
                      className="flex flex-col gap-2 p-4 hover:bg-gray-100 w-full border-b"
                      to={`/s/${value.slug}`}
                      onClick={onClose}
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
                  <div className="flex flex-col gap-2 p-4 hover:bg-gray-100 w-full border-b">
                    نتیجه ای یافت نشد !!
                  </div>
                )}
              </div>
            ) : (
              <Spinner />
            )}
          </>
        ) : (
          <PopularSearch onClose={onClose} />
        )}
      </div>
    </>
  );
};
export default SearchResult;
