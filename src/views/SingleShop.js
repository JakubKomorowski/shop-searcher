import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ShopMap from "../components/ShopMap";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const SingleShop = ({ location: { state } }) => {
  const classes = useStyles();

  const { shopProductsCategories, shopDetails, shopId, documentId } = state;

  const allProducts = useSelector(({ allProducts }) => allProducts);
  const shopData = useSelector(({ shopData }) => shopData);
  const selectedShop = useSelector(({ seletedShop }) => seletedShop);

  console.log(shopData);

  const [searchInput, setSearchInput] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [tempShopMap, setTempShopMap] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [foundProducts, setFoundProducts] = useState([]);

  const [searchProductName, setSearchProductName] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const findShop = () => {
    const foundShop = shopData.find(
      (shop) => shop.shopDetails.shopId === shopId
    );
    setTempShopMap(foundShop.shopDetails.shopMap);
    console.log(foundShop, "SHOP");
  };

  useEffect(() => {
    findShop();
  }, []);

  const filterShopProductsBySearchInput = () => {
    if (searchInput.length !== 0) {
      // const filteredArray = shopProductsCategories.filter((item) => {
      //   let isIn;

      //   item.subCategories.forEach((el) => {
      //     let isIn2;

      //     el.brands.forEach((el) => {
      //       if (el.brandName.startsWith(searchInput)) {
      //         isIn2 = true;
      //       } else {
      //         isIn2 = false;
      //       }
      //     });

      //     if (el.subCategoryName.startsWith(searchInput) || isIn2 === true) {
      //       isIn = true;
      //     } else {
      //       isIn = false;
      //     }
      //   });

      //   return item.categoryName.startsWith(searchInput) || isIn === true;
      // });

      // console.log(filteredArray);

      const mappedArray = shopProductsCategories.map((category) => {
        let isInSubCategory;

        if (category.name.startsWith(searchInput)) {
          return {
            name: category.name,
            coordinates: category.coordinates,
          };
        }

        const array = category.subCategories.map((subCategory) => {
          if (subCategory.name.startsWith(searchInput)) {
            return {
              name: subCategory.name,
              coordinates: subCategory.coordinates,
            };
          }
        });

        console.log(array, "piwo");
      });

      console.log(mappedArray);
    }
  };

  // console.log(shopDetails.shopMap, "TUTAJ");

  const searchForProducts = (tempSearchProductName) => {
    const newShopMap = selectedShop.shopDetails.shopMap.map((item) => {
      return {
        ...item,
        lineArr: item.lineArr.map((line) => {
          return {
            ...line,
            dots: line.dots.map((dot) => {
              const lowerCaseProducts = dot.products.map((product) =>
                product.toLowerCase()
              );

              console.log(lowerCaseProducts, "TU");

              if (
                lowerCaseProducts.includes(tempSearchProductName.toLowerCase())
              ) {
                return {
                  ...dot,
                  color: "blue",
                };
              } else {
                return {
                  ...dot,
                  color: "gray",
                };
              }
            }),
          };
        }),
      };
    });

    console.log(newShopMap, "ARRAY");

    setTempShopMap([...newShopMap]);
    setSearchProductName("");
  };

  //reducer -> productsTagsArray
  useEffect(() => {
    filterShopProductsBySearchInput();
  }, [searchInput]);

  const handleInputChage = (e) => {
    setInputValue(e.target.value);
  };

  const searchCategories = () => {
    if (searchProductName.length !== 0) {
      const searchedProducts = allProducts.filter((product) => {
        return product
          .toLowerCase()
          .startsWith(searchProductName.toLowerCase());
      });
      setFoundProducts(searchedProducts);
    } else {
      setFoundProducts([]);
    }
  };

  useEffect(() => {
    searchCategories();
  }, [searchProductName]);

  const searchProductByKeyWordsList = (productName) => {
    setSearchProductName(productName);
    searchForProducts(productName);
  };

  return (
    <div>
      {/* <form onSubmit={handleSearchProductForm}> */}
      <input
        type="text"
        value={searchProductName}
        onChange={(e) => setSearchProductName(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => searchForProducts(searchProductName)}
      >
        szukaj
      </button>
      {/* </form> */}
      <ul>
        {foundProducts.map((product, index) => {
          return (
            <li
              key={index}
              onClick={() => searchProductByKeyWordsList(product)}
            >
              {product}
            </li>
          );
        })}
      </ul>
      <Autocomplete
        id="country-select-demo"
        style={{ width: 300 }}
        options={allProducts}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        // Problem z onChange
        onChange={(e, value) => setSearchProductName(value)}
        defaultValue=""
        //
        inputValue={searchProductName}
        onInputChange={(e, value) => setSearchProductName(value)}
        getOptionLabel={(option) => option}
        renderOption={(option) => <>{option}</>}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for products"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: "off",
            }}
          />
        )}
      />
      <button onClick={searchForProducts}>szukaj</button>

      <h1>Single shop</h1>
      {selectedShop ? (
        <ShopMap
          shopMapData={selectedShop.shopDetails.shopMap}
          shopId={shopId}
          documentId={documentId}
        />
      ) : null}
    </div>
  );
};

export default SingleShop;
