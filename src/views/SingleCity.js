import React from "react";
import ShopList from "../components/ShopList";

const SingleCity = (props) => {
  const { cityName, shops, documentId } = props.location.state;

  return (
    <>
      <h1>{cityName}</h1>
      <ShopList
        shopsArray={shops}
        cityName={cityName}
        documentId={documentId}
      />
    </>
  );
};

export default SingleCity;
