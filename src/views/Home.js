import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopSearchValue, findNewCities } from "../actions";
import CityList from "../components/CityList";

const Home = () => {
  const { mainData, cityInput, foundCities } = useSelector(
    ({ mainData, cityInput, foundCities }) => ({
      mainData,
      cityInput,
      foundCities,
    })
  );
  const dispatch = useDispatch();

  const handleCityInput = (e) => {
    dispatch(shopSearchValue(e.target.value));
  };

  const findCity = () => {
    if (cityInput.length !== 0) {
      const foundCity = mainData.filter((item) => {
        return item.cityData.cityName
          .toLowerCase()
          .startsWith(cityInput.toLowerCase());
      });

      dispatch(findNewCities(foundCity));
    } else dispatch(findNewCities([]));
  };

  useEffect(() => {
    findCity();
  }, [cityInput]);

  return (
    <>
      <input type="text" value={cityInput} onChange={handleCityInput} />
      <CityList cityArray={foundCities} />
    </>
  );
};

export default Home;
