import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { addMapToShop, mainData } from "../firebase/firebaseUtils";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const AddShopForm = ({ rect }) => {
  const classes = useStyles();
  // const [shopName, setShopName] = useState("");
  // const [shopSuburb, setShopSuburb] = useState("");
  // const [shopStreet, setShopStreet] = useState("");

  // const handleShopNameChange = (event) => {
  //   setShopName(event.target.value);
  // };

  // const handleShopSuburbChange = (event) => {
  //   setShopSuburb(event.target.value);
  // };

  // const handleShopStreetChange = (event) => {
  //   setShopStreet(event.target.value);
  // };

  const mainData = useSelector((state) => state.mainData);

  const handleAddShop = (e) => {
    e.preventDefault();
    const shopName = e.target.shopName.value;

    const shopStreet = e.target.shopStreet.value;

    const shopSuburb = e.target.shopSuburb.value;

    const newShop = {
      shopDetails: {
        shopId: Math.floor(Math.random() * 10000),
        shopName,
        shopStreet,
        shopSuburb,
        shopMap: rect,
      },
    };

    const newShopData = [...mainData[0].shops, newShop];

    addMapToShop("Bty6HInTSjXwKSqumL9R", newShopData);
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleAddShop}
    >
      <div>
        <TextField
          id="shopName"
          label="Shop Name"
          // value={shopName}
          // onChange={handleShopNameChange}

          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="shopSuburb"
          label="Shop Suburb"
          // value={shopSuburb}
          // onChange={handleShopSuburbChange}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="shopStreet"
          label="Shop Street"
          // value={shopStreet}
          // onChange={handleShopStreetChange}
          variant="outlined"
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default AddShopForm;
