import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Shop from "./Shop";
import { selectShop } from "../actions";

const ShopList = ({ shopsArray, cityName, documentId }) => {
  console.log(cityName);
  console.log(shopsArray, "SHOPPPPP");
  const dispatch = useDispatch();
  return (
    <ul>
      {shopsArray.map((shop) => {
        const { shopName, shopStreet, shopId } = shop.shopDetails;
        return (
          <Link
            onClick={() => dispatch(selectShop(shop))}
            to={{
              pathname: `/miasto/${cityName}/${shopName}-${shopStreet.replace(
                /\s/g,
                "-"
              )}`,
              //przekazac shop do stanu w reduxie
              state: {
                shopId,
                documentId,
              },
            }}
          >
            <li>
              <Shop {...shop} />
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default ShopList;
