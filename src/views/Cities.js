import React from "react";
import { useSelector } from "react-redux";
import CityList from "../components/CityList";

const Cities = () => {
  const allCities = useSelector(({ mainData }) => mainData);
  return <CityList cityArray={allCities} />;
};

export default Cities;
