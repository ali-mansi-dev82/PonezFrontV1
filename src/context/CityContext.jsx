import React, { createContext, useState, useContext, useEffect } from "react";
import { getCityCookie, setCityCookie } from "../shared/util/cityCookie";
import { useNavigate } from "react-router-dom";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const cookie = await getCityCookie();
      if (cookie) {
        setCity(cookie);
      } else {
        navigate(`/`);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (city && city !== "") {
      setCityCookie(city);
    }
  }, [city]);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
