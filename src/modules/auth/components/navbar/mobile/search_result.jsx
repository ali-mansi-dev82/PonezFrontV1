import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Spinner from "../../../../../shared/components/spiner";
import PopularSearch from "../search/popular_search";
import { Link } from "react-router-dom";
import TextInput from "../../../../../shared/components/input/textInput";

const SearchResult = ({ searchFn, closeSearch, searchMutation }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    console.log(inputRef.current);
  }, []);

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={closeSearch}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className=""
    >
      <DialogTitle className="flex flex-row gap-3 p-4">
        <IconButton onClick={closeSearch} size="small">
          <ArrowRight size={20} />
        </IconButton>
        {/* TextInput */}
        <TextInput
          inputRef={inputRef}
          placeholder="جستجو در پونز"
          size="small"
          variant="standard"
          fullWidth
          autoFocus
        />
      </DialogTitle>
      <DialogContent className="p-4">
        {searchMutation?.data ? (
          <>
            {searchMutation?.isSuccess ? (
              <div className="w-full flex flex-col gap-0">
                {searchMutation?.data?.length ? (
                  searchMutation?.data?.map((value, index) => (
                    <Link
                      className="flex flex-col gap-2 p-4 hover:bg-gray-100 w-full border-b"
                      to={`/s/${value.slug}`}
                      onClick={closeSearch}
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
          <PopularSearch onClose={closeSearch} />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default SearchResult;
