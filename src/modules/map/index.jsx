import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Mapir from "mapir-react-component";
import { findStateCordinate, findStates } from "./query";

const mapToken = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key": process.env.REACT_APP_MAP_TOKEN,
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

function Map() {
  const [state, setState] = useState("");
  const [center, setCenter] = useState([51.489291, 35.7094244]);

  const stateQuery = useQuery({
    queryKey: ["states"],
    queryFn: findStates.bind(this),
  });
  const stateCordinateQuery = useQuery({
    queryKey: ["states-cordiante"],
    queryFn: findStateCordinate.bind(this, state),
    enabled: false,
  });
  const onChangeStateHandler = (e) => {
    setState(e.target.value);
  };
  useEffect(() => {
    if (state !== "") {
      stateCordinateQuery.refetch();
    }
  }, [state]);
  useEffect(() => {
    if (stateCordinateQuery?.data) {
      const center = stateCordinateQuery?.data?.value[0]?.geom?.coordinates;
      console.log(center);
      setCenter(center);
    }
  }, [stateCordinateQuery?.data]);

  return (
    <div className="relative overflow-hidden z-0">
      <div className="absolute top-5 right-5">
        <select
          className="select select-bordered bg-white"
          onChange={onChangeStateHandler}
          defaultValue={""}
        >
          <option disabled value={""}>
            انتخاب کنید
          </option>
          {stateQuery?.data &&
            stateQuery?.data?.map((value, index) => {
              return (
                <option key={index} value={value.stateName}>
                  {value.stateName}
                </option>
              );
            })}
        </select>
      </div>

      <Mapir center={center} Map={mapToken}>
        <Mapir.Marker
          coordinates={center}
          anchor="bottom"
        ></Mapir.Marker>
      </Mapir>
    </div>
  );
}

export default Map;
