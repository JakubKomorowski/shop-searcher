import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useSelector, useStore } from "react-redux";
import { mainData, products } from "../firebase/firebaseUtils";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "35vw",
    height: "60vh",
    borderRadius: "20px",
  },
}));

const style = {
  display: "flex",
  justifyContent: "space-between",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

const ShopMap = ({ shopMapData, shopId, documentId }) => {
  const classes = useStyles();

  const allProducts = useSelector(({ allProducts }) => allProducts);

  const selectedShop = useSelector(({ seletedShop }) => seletedShop);

  const mainReducerData = useSelector(({ mainData }) => mainData);
  const [shopMap, setShopMap] = useState([...shopMapData]);
  const [colorChangeActive, setColorChangeActive] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [categorySelect, setCategorySelect] = useState("");
  const [productName, setProductName] = useState("");
  const [productsArray, setProductsArray] = useState([]);

  const changeColor = (elId, lineId, dotId) => {
    console.log("HELP");
    const newRect = shopMap.map((elem) => {
      if (elem.id === elId) {
        const newLineArray = elem.lineArr.map((line) => {
          if (line.id === lineId) {
            const newDotsArray = line.dots.map((dot) => {
              if (dot.id === dotId) {
                return {
                  ...dot,
                  color: dot.color === "blue" ? "grey" : "blue",
                  products: [...dot.products, productName],
                };
              } else {
                return dot;
              }
            });
            return {
              ...line,
              dots: [...newDotsArray],
            };
          } else {
            return line;
          }
        });

        return {
          ...elem,
          lineArr: [...newLineArray],
        };
      } else {
        return elem;
      }
    });

    setProductsArray([...productsArray, productName]);
    console.log("DZIALA");
    console.log(newRect);
    setShopMap([...newRect]);
    deactivateColorChange();
    setProductName("");
  };

  const deactivateColorChange = () => {
    setColorChangeActive(false);
  };

  const toggleColorChangeActive = () => {
    setColorChangeActive(!colorChangeActive);
  };

  const handleAddProductModalOpen = () => {
    setIsAddProductModalOpen(true);
  };

  const handleAddProductModalClose = () => {
    setIsAddProductModalOpen(false);
  };

  const handleAddProductForm = (e) => {
    e.preventDefault();

    const product = {
      name: e.target.productName.value,
    };
  };

  const saveChanges = () => {
    console.log(documentId);
    const testArray = mainReducerData.map((city) => {
      return {
        ...city,
        shops: city.shops.map((shop) => {
          if (shop.shopDetails.shopId === shopId) {
            return {
              shopDetails: {
                ...shop.shopDetails,
                shopMap: shopMap.map((item) => {
                  return {
                    ...item,
                    lineArr: item.lineArr.map((line) => {
                      return {
                        ...line,
                        dots: line.dots.map((dot) => {
                          return {
                            ...dot,
                            color: "gray",
                          };
                        }),
                      };
                    }),
                  };
                }),
              },
            };
          } else {
            return shop;
          }
        }),
      };
    });

    console.log(testArray, "TUTAJ");

    // setShopMap([...]);

    products.doc("AKEmJTWYCIzl8dkucY9V").set({
      products: [...allProducts, ...productsArray],
    });

    mainData
      .doc(documentId)
      .set(...testArray)
      .then(() => window.location.reload(true));
  };

  return (
    <div
      style={{ width: "1200px", height: "700px", border: "1px solid black" }}
    >
      <div>
        <button
          onClick={
            colorChangeActive
              ? deactivateColorChange
              : handleAddProductModalOpen
          }
        >
          {colorChangeActive ? "stop adding" : "add product"}{" "}
        </button>
      </div>

      <button onClick={saveChanges}>zapisz zmiany</button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isAddProductModalOpen}
        onClose={handleAddProductModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isAddProductModalOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add product</h2>
            {/* <form
              className={classes.root}
              noValidate
              autoComplete="off"
              // onSubmit={handleAddShop}
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Choose Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={categorySelect}
                  onChange={(e) => setCategorySelect(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="Piwo">Piwo</MenuItem>
                  <MenuItem value="Wino">Wino</MenuItem>
                  <MenuItem value="Pieczywo">Pieczywo</MenuItem>
                </Select>
              </FormControl>
              <div> */}
            <TextField
              id="shopStreet"
              label="Product name"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              variant="outlined"
            />
            <button
              onClick={() => {
                handleAddProductModalClose();
                alert("Wybierz kropki");
                setColorChangeActive(true);
              }}
            >
              dodaj
            </button>
          </div>
          {/* <button type="submit">add</button>
            </form>
          </div> */}
        </Fade>
      </Modal>

      {shopMapData?.map((el) => {
        return (
          <Rnd
            disableDragging={true}
            style={style}
            default={el.default}
            size={{ width: el.width, height: el.height }}
            position={{ x: el.x, y: el.y }}
            minWidth={el.minWidth}
            minHeight={el.minHeight}
            bounds={el.bounds}
            enableResizing={false}
          >
            <div>
              {el.linesTurn === "vertical" ? (
                <div
                  style={{
                    display: "flex",
                    width: `${el.width}px`,
                    justifyContent: "space-between",
                  }}
                >
                  {el.lineArr.map((line) => {
                    return (
                      <div
                        style={{
                          width: "3px",
                          height: `${el.height}px`,
                          zIndex: 20,
                          backgroundColor: "black",
                          position: "relative",
                        }}
                      >
                        {line.dots.map((dot) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: `${el.height / 10}px`,
                              }}
                            >
                              {dot.count <= 9 ? (
                                <div
                                  onClick={() =>
                                    colorChangeActive &&
                                    changeColor(el.id, line.id, dot.id)
                                  }
                                  style={{
                                    width: `${el.height / 20}px`,
                                    height: `${el.height / 10}px`,
                                    background: dot.color,
                                    borderRadius: "50%",
                                    marginLeft: `-${el.height / 20}px`,
                                    marginTop: `-${el.height / 10}px`,
                                  }}
                                ></div>
                              ) : (
                                <div
                                  onClick={() =>
                                    colorChangeActive &&
                                    changeColor(el.id, line.id, dot.id)
                                  }
                                  style={{
                                    width: `${el.height / 20}px`,
                                    height: `${el.height / 10}px`,
                                    background: dot.color,
                                    borderRadius: "50%",
                                    marginLeft: `3px`,
                                    marginTop: `-${
                                      el.height + el.height / 10
                                    }px`,
                                  }}
                                ></div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: `${el.height}px`,
                    justifyContent: "space-between",
                  }}
                >
                  {el.lineArr.map((line) => {
                    return (
                      <div
                        style={{
                          width: `${el.width}px`,
                          height: "3px",
                          background: "black",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          {line.dots.map((dot) => {
                            if (dot.count <= 9) {
                              return (
                                <div
                                  onClick={() =>
                                    colorChangeActive &&
                                    changeColor(el.id, line.id, dot.id)
                                  }
                                  style={{
                                    width: `${el.width / 10}px`,
                                    height: `${el.width / 20}px`,
                                    background: dot.color,
                                    borderRadius: "50%",
                                    marginTop: `-${el.width / 20}px`,
                                  }}
                                ></div>
                              );
                            }
                          })}
                        </div>
                        <div style={{ display: "flex" }}>
                          {line.dots.map((dot) => {
                            if (dot.count > 9 && dot.count <= 19) {
                              return (
                                <div
                                  onClick={() =>
                                    colorChangeActive &&
                                    changeColor(el.id, line.id, dot.id)
                                  }
                                  style={{
                                    width: `${el.width / 10}px`,
                                    height: `${el.width / 20}px`,
                                    background: dot.color,
                                    borderRadius: "50%",
                                    marginTop: `3px`,
                                  }}
                                ></div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Rnd>
        );
      })}
    </div>
  );
};

export default ShopMap;
