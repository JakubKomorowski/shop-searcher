import React from "react";
import City from "./City";

const CityList = ({ cityArray }) => {
  return (
    <ul>
      {cityArray.map((city) => (
        <li>
          <City {...city} />
        </li>
      ))}
    </ul>
  );
};

export default CityList;
