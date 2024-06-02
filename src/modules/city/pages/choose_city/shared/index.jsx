import { Autocomplete, Button, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useCity } from "../../../../../context/CityContext";
import { FindCityFn } from "../../../query";

const ChooseCity = () => {
  const { setCity } = useCity();

  const searchCityQuery = useQuery({
    queryKey: ["find_cities"],
    queryFn: FindCityFn.bind(this),
  });

  const options = searchCityQuery?.data?.data?.map
    ? searchCityQuery?.data?.data?.map((value) => value.name)
    : [];

  return (
    <div className="flex flex-col gap-8 lg:w-[500px]">
      <div className="flex flex-col">
        <h6 className="w-full text-lg text-gray-800 mb-3">
          در چه شهری زندگی میکنید ؟
        </h6>
        <p className="w-full text-sm text-gray-400 mb-4">
          با جستجو در کادر زیر، شهر خودتان را انتخاب کنید.
        </p>
      </div>

      <Autocomplete
        disablePortal
        fullWidth
        options={options}
        onChange={(e, value) => {
          console.log(e, value);
          setCity(value);
        }}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField size="small" label="شهر" fullWidth {...params} />
        )}
      />
      <div className="flex flex-col gap-8">
        <h6 className="text-sm text-gray-500">شهر های پر جستجو</h6>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={setCity.bind(this, "تهران")}>تهران</Button>
          <Button onClick={setCity.bind(this, "کرج")}>کرج</Button>
          <Button onClick={setCity.bind(this, "مشهد")}>مشهد</Button>
          <Button onClick={setCity.bind(this, "اصفهان")}>اصفهان</Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={setCity.bind(this, "تبریز")}>تبریز</Button>
          <Button onClick={setCity.bind(this, "شیراز")}>شیراز</Button>
          <Button onClick={setCity.bind(this, "قم")}>قم</Button>
          <Button onClick={setCity.bind(this, "همدان")}>همدان</Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseCity;
