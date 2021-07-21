import React from "react";

const Shop = ({ shopDetails: { shopName, shopStreet } }) => {
  return (
    <>
      <h2>{shopName}</h2>
      <h3>Ulica: {shopStreet}</h3>
    </>
  );
};

export default Shop;
