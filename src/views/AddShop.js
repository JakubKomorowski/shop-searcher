import React from "react";
import AddShopForm from "../components/AddShopForm";
import Drawer3 from "../components/Drawer3";

const AddShop = () => {
  let tempDotsArr = [];

  for (let j = 0; j <= 60; j++) {
    tempDotsArr.push({
      // id: uuidv4(),
      count: j,
      color: "gray",
    });
  }
  return (
    <>
      {/* <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          {tempDotsArr.map((dot) => {
            return (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "gray",
                  borderRadius: "50%",
                }}
              ></div>
            );
          })}
        </div> */}

      <Drawer3 />
    </>
  );
};

export default AddShop;
