import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ArrowRight, ChevronLeft, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useCity } from "../../../../../context/CityContext";
import { FindStateFn } from "../../../../state/query";
import Spinner from "../../../../../shared/components/spiner";

const SelectCity = ({ onClose }) => {
  const { city, setCity } = useCity();
  const [state, setState] = useState({});
  const [localCity, setLocalCity] = useState("");

  const statesQuery = useQuery({
    queryKey: ["get_all_cities"],
    queryFn: FindStateFn.bind(this),
  });

  useEffect(() => {
    if (city && city !== "") {
      setLocalCity(city);
    }
  }, []);

  return (
    <>
      <input type="checkbox" checked id="my_modal_6" className="modal-toggle" />
      <div className="modal bg-white select-none" role="dialog">
        <div className="modal-box bg-white p-0 rounded-md">
          <div className="flex flex-col p-6 gap-3 border-b">
            <div className="w-full flex flex-row justify-between items-center">
              <h3 className="font-bold text-lg">انتخاب شهر</h3>
              <Button onClick={() => setLocalCity("")} size="small">
                حذف همه
              </Button>
            </div>
            <div className="pb-2">
              {localCity !== "" ? (
                <Chip label={localCity} />
              ) : (
                <p className="text-gray-400 text-xs">
                  حداقل یک شهر را انتخاب کنید.
                </p>
              )}
            </div>
            <TextField
              variant="outlined"
              size="small"
              placeholder="جستجو در شهر ها"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="max-h-[50vh] overflow-y-auto py-2 px-6">
            {state?._id ? (
              <>
                <div
                  onClick={() => setState("")}
                  className="w-full flex flex-row gap-3 border-b last:border-b-0 items-center py-3 cursor-pointer"
                >
                  <span className="text-gray-400">
                    <ArrowRight size={16} />
                  </span>
                  <p>همه شهر ها</p>
                </div>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={localCity}
                  onChange={(e) => setLocalCity(e.target.value)}
                >
                  {state?.cities &&
                    state?.cities?.map((value, index) => (
                      <div
                        key={index}
                        onClick={() => setLocalCity(value.name)}
                        className="w-full flex flex-row justify-between gap-3 border-b last:border-b-0 items-center py-1 cursor-pointer"
                      >
                        <p>{value.name}</p>
                        <FormControlLabel
                          value={value.name}
                          control={<Radio />}
                        />
                      </div>
                    ))}
                </RadioGroup>
              </>
            ) : statesQuery?.data?.data ? (
              statesQuery?.data?.data?.map((value, index) => (
                <div
                  key={index}
                  onClick={() => setState(value)}
                  className="w-full flex flex-row justify-between border-b last:border-b-0 items-center py-3 cursor-pointer"
                >
                  <p>{value.name}</p>
                  <span className="text-gray-400">
                    <ChevronLeft size={16} />
                  </span>
                </div>
              ))
            ) : (
              <Spinner />
            )}
          </div>
          <div className="w-full flex flex-row gap-4 items-center p-4 border-t">
            <Button className="!w-1/2" variant="outlined" onClick={onClose}>
              انصراف
            </Button>
            <Button
              className="!w-1/2"
              variant="contained"
              disabled={localCity === city}
              onClick={() => {
                setCity(localCity);
                onClose();
              }}
            >
              تایید
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectCity;
