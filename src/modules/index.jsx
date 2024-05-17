import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChooseCityPage from "../modules/city/pages/choose_city";
import Spinner from "../shared/components/spiner";
import MainContainer from "../shared/components/container";
import { useCity } from "../context/CityContext";
import { getCityCookie, setCityCookie } from "../shared/util/cityCookie";

const Home = ({ isMobile }) => {
  const { city, setCity } = useCity();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const init = async () => {
    const cookie = await getCityCookie();
    if (!cookie) return setLoading(false);
    setCity(cookie);
    navigate(`/s/`);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (city && city !== "") {
      setCityCookie(city);
      navigate(`/s/`);
    }
  }, [city]);

  return loading ? (
    <MainContainer className={`w-full flex justify-center gap-5 py-12`}>
      <div className="flex flex-col w-[600px] gap-0">
        <Spinner />
      </div>
    </MainContainer>
  ) : (
    <ChooseCityPage isMobile={isMobile} />
  );
};

export default Home;
