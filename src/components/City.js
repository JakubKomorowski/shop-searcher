import React from "react";
import { Link } from "react-router-dom";

const City = ({ cityData: { cityName }, shops, documentId }) => {
  return (
    <Link
      to={{
        pathname: `/miasto/${cityName}`,
        state: {
          cityName,
          shops,
          documentId,
        },
      }}
    >
      <h3>{cityName}</h3>
      <h5>Ilość sklepów: {shops.length}</h5>
    </Link>
  );
};

export default City;
