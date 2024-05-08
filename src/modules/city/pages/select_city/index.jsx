import React from "react";
import SelectCity from "../../components/select_city";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useCity } from "../../../../context/CityContext";
import { useQuery } from "@tanstack/react-query";
import { FindCityFn } from "../../query";

const SelectPage = () => {
  const { setCity } = useCity();

  const searchCityQuery = useQuery({
    queryKey: ["find_cities"],
    queryFn: FindCityFn.bind(this),
  });

  return (
    <>
      <h6 className="w-full text-lg text-gray-800 mb-3">
        در چه شهری زندگی میکنید ؟
      </h6>
      <p className="w-full text-xs text-gray-400 mb-4">
        با جستجو در کادر زیر، شهر خودتان را انتخاب کنید.
      </p>
      {/* <SelectCity
        onChange={(city) => {
          setCity(city);
        }}
        placeholder="مثلا: تهران، اصفهان، مشهد ..."
      /> */}
      <Autocomplete
        disablePortal
        fullWidth
        options={["اصفهان"]}
        // onChange={(e, value) => {
        //   onChange(value.label);
        // }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField size="small" fullWidth {...params} />
        )}
      />
      <TextField
        id="outlined-basic"
        dir="rtl"
        size="small"
        placeholder="شهر خود را انتخاب کنید..."
        variant="outlined"
      />
      <div className="grid grid-cols-4 gap-2 pt-8">
        <Button onClick={setCity.bind(this, "اصفهان")}>اصفهان</Button>
        <Button onClick={setCity.bind(this, "تهران")}>تهران</Button>
        <Button onClick={setCity.bind(this, "مشهد")}>مشهد</Button>
        <Button onClick={setCity.bind(this, "تبریز")}>تبریز</Button>
      </div>
    </>
  );
};

export default SelectPage;
