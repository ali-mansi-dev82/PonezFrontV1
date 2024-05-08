import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ArrowRight, ChevronLeft, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useCity } from "../../../../context/CityContext";
import { FindStateFn } from "../../../state/query";
import Spinner from "../../../../shared/components/spiner";

const SelectCity = ({ onClose, isMobile }) => {
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
    <Dialog
      fullScreen={isMobile}
      open={true}
      onClose={onClose}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="scroll-dialog-title"
        className="flex flex-col gap-1 border-b border-gray-300 shadow"
      >
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="font-bold text-lg">انتخاب شهر</h3>
          <Button onClick={setLocalCity.bind(this, "")} size="small">
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
      </DialogTitle>
      <DialogContent className="w-auto lg:!min-w-[400px] lg:!max-h-[50vh]">
        {state?._id ? (
          <>
            <div
              onClick={setState.bind(this, "")}
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
                    onClick={setLocalCity.bind(this, value.name)}
                    className="w-full flex flex-row justify-between gap-3 border-b last:border-b-0 items-center py-1 cursor-pointer"
                  >
                    <p>{value.name}</p>
                    <FormControlLabel value={value.name} control={<Radio />} />
                  </div>
                ))}
            </RadioGroup>
          </>
        ) : statesQuery?.data?.data ? (
          statesQuery?.data?.data?.map((value, index) => (
            <div
              key={index}
              onClick={setState.bind(this, value)}
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
      </DialogContent>
      <DialogActions className="gap-2 border-t border-gray-300">
        {" "}
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
      </DialogActions>
      {/* <div
        className="modal bg-white select-none w-[80vw] lg:w-[450px]"
        role="dialog"
      >
        <div className="modal-box bg-white p-0 rounded-md">
          <div className="flex flex-col p-6 gap-3 border-b"></div>
          <div className="max-h-[50vh] overflow-y-auto py-2 px-6">
            
          </div>
          <div className="w-full flex flex-row gap-4 items-center p-4 border-t"></div>
        </div>
      </div> */}
    </Dialog>
  );
};
export default SelectCity;
