import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {  ChevronLeft, MoveRightIcon, X } from "lucide-react";
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
        className="flex flex-col gap-1 border-b border-gray-300 "
      >
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-lg">انتخاب شهر</h3>
          <Button onClick={setLocalCity.bind(this, "")} size="small">
            حذف همه
          </Button>
        </div>
        <div className="my-2 ">
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
          size="medium"
          label="شهر ها"
          placeholder="جستجو در شهر ها"
        />
      </DialogTitle>
      <DialogContent className="w-auto lg:!min-w-[400px] lg:!max-h-[50vh] text-gray-800">
        {state?._id ? (
          <>
            <div
              onClick={setState.bind(this, "")}
              className="w-full flex flex-row gap-3 border-b last:border-b-0 items-center py-[18px] cursor-pointer"
            >
              <span className="">
                <MoveRightIcon size={16} />
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
              className="w-full flex flex-row justify-between border-b last:border-b-0 items-center py-[18px] cursor-pointer"
            >
              <p className="text-sm">{value.name}</p>
              <span className="text-gray-400">
                <ChevronLeft size={16} />
              </span>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </DialogContent>
      <DialogActions className="gap-2 border-t border-gray-300 !p-[16px]">
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
        <Button className="!w-1/2 !border-gray-200 !text-gray-900" variant="outlined" onClick={onClose}>
          انصراف
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SelectCity;
