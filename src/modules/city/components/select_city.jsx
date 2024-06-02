import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FindCityFn } from "../query";

const SelectCity = ({ placeholder, onChange }) => {
  const [cities, setCities] = useState("");

  const searchCityQuery = useQuery({
    queryKey: ["find_cities"],
    queryFn: FindCityFn.bind(this),
  });

  useEffect(() => {
    if (searchCityQuery?.data && searchCityQuery?.data.length > 0) {
      setCities(
        searchCityQuery?.data?.map((value) => {
          return { label: value.name };
        })
      );
    }
  }, [searchCityQuery?.data]);

  return (
    <Autocomplete
      loading
      disablePortal
      fullWidth={true}
      options={cities}
      onChange={(e, value) => {
        onChange(value.label);
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField placeholder={placeholder} fullWidth {...params} />
      )}
    />
  );
};

export default SelectCity;
