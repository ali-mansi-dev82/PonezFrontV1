import React from "react";
import SelectCity from "../../components/select_city";
import { Button } from "@mui/material";
import { useCity } from "../../../../context/CityContext";

const SelectPage = () => {
  const { setCity } = useCity();

  return (
    <>
      <h6 className="w-full text-lg text-gray-800 mb-3">
        در چه شهری زندگی میکنید ؟
      </h6>
      <p className="w-full text-sm text-gray-400 mb-4">
        با جستجو در کادر زیر، شهر خودتان را انتخاب کنید.
      </p>
      {/* <input
              type="text"
              onChange={searchInputHandler}
              placeholder="مثلا: تهران، اصفهان، مشهد ..."
              className="w-full input input-bordered focus:border-red-700 bg-white border-gray-300 mb-3 focus:outline-none"
            /> */}
      <SelectCity
        onChange={(city) => {
          setCity(city);
        }}
        placeholder="مثلا: تهران، اصفهان، مشهد ..."
      />

      <Button onClick={() => setCity("اصفهان")}>اصفهان</Button>
      <Button onClick={() => setCity("تهران")}>تهران</Button>
      <Button onClick={() => setCity("مشهد")}>مشهد</Button>
    </>
  );
};

export default SelectPage;
