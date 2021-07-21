import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { addMapToShop } from "../firebase/firebaseUtils";
import { v4 as uuidv4 } from "uuid";
import AddShopForm from "./AddShopForm";

const Drawer3 = () => {
  const initialState = [
    {
      id: 2,
      linesNum: 0,
      linesTurn: "horizontal",
      lineArr: [],
      width: 120,
      height: 190,
      x: 100,
      y: 200,
      default: {
        x: 150,
        y: 205,
        width: 500,
        height: 190,
      },
      minWidth: 20,
      minHeight: 10,
      bounds: "parent",
    },
    {
      id: 1,
      linesNum: 0,
      linesTurn: "vertical",
      lineArr: [],
      width: 100,
      height: 150,
      x: 170,
      y: 300,
      default: {
        x: 15,
        y: 300,
        width: 200,
        height: 190,
      },
      minWidth: 20,
      minHeight: 10,
      bounds: "parent",
    },
  ];

  const style = {
    display: "flex",
    justifyContent: "space-between",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
  };

  const [rect, setRect] = useState([...initialState]);
  const [isDragable, setIsDragable] = useState(true);

  const addRect = () => {
    const newRect = {
      id: uuidv4(),
      linesNum: 0,
      linesTurn: "horizontal",
      lineArr: [],
      width: 200,
      height: 300,
      x: 50,
      y: 80,
      default: {
        x: 50,
        y: 80,
        width: 200,
        height: 300,
      },
      minWidth: 20,
      minHeight: 10,
      bounds: "parent",
    };

    setRect([...rect, newRect]);
  };

  const changeLinesTurn = (id, e) => {
    const mappedSelections = rect.map((el) => {
      if (el.id === id) {
        el.linesTurn = e.target.value;
      }
      return el;
    });
    setRect([...mappedSelections]);
  };

  const changeLinesNumber = (id, e) => {
    const mappedSelections = rect.map((el) => {
      if (el.id === id) {
        el.linesNum = e.target.value;

        // for (let j = 0; j <= 19; j++) {
        //   tempDotsArr.push({
        //     id: uuidv4(),
        //     count: j,
        //     color: "gray",
        //   });
        // }

        let tempLineArr = [];

        for (let i = 0; i < parseInt(e.target.value); i++) {
          let tempDotsArr = [];

          for (let j = 0; j <= 19; j++) {
            tempDotsArr.push({
              id: uuidv4(),
              count: j,
              color: "gray",
              products: [],
            });
          }

          tempLineArr.push({
            id: uuidv4(),

            dots: [...tempDotsArr],
          });
        }

        el.lineArr = [...tempLineArr];
      }
      return el;
    });
    setRect([...mappedSelections]);
  };

  const changeColor = (elId, lineId, dotId) => {
    const newRect = rect.map((elem) => {
      if (elem.id === elId) {
        const newLineArray = elem.lineArr.map((line) => {
          if (line.id === lineId) {
            const newDotsArray = line.dots.map((dot) => {
              if (dot.id === dotId) {
                return {
                  ...dot,
                  color: "blue",
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
    console.log("DZIALA");
    console.log(newRect);
    setRect([...newRect]);
  };

  const toggleDragging = () => {
    setIsDragable(!isDragable);
  };

  const addMapToShopFn = () => {
    addMapToShop();
  };

  return (
    <>
      <div
        style={{ width: "1200px", height: "700px", border: "1px solid black" }}
      >
        {rect.map((el) => {
          return (
            <Rnd
              disableDragging={isDragable ? false : true}
              style={style}
              default={el.default}
              size={{ width: el.width, height: el.height }}
              position={{ x: el.x, y: el.y }}
              onDragStop={(e, d) => {
                const newRect2 = rect.map((elem) => {
                  if (el.id === elem.id) {
                    return {
                      ...elem,
                      x: d.x,
                      y: d.y,
                    };
                  }
                  return elem;
                });
                setRect(newRect2);
              }}
              minWidth={el.minWidth}
              minHeight={el.minHeight}
              bounds={el.bounds}
              onResize={(e, direction, ref, delta, position) => {
                const newRect = rect.map((elem) => {
                  if (el.id === elem.id) {
                    return {
                      ...elem,
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      ...position,
                    };
                  }
                  return elem;
                });
                setRect(newRect);
              }}
            >
              <input
                type="number"
                value={el.linesNum}
                onChange={(e) => changeLinesNumber(el.id, e)}
                style={{
                  width: "50px",
                  position: "absolute",
                  top: "-22px",
                  left: "0",
                }}
              />
              <div>
                <input
                  type="radio"
                  id="vertical"
                  checked={el.linesTurn === "vertical"}
                  value={"vertical"}
                  onChange={(e) => changeLinesTurn(el.id, e)}
                  style={{
                    position: "absolute",
                    top: `-20px`,
                    left: `60px`,
                  }}
                />
                <input
                  type="radio"
                  id="horizontal"
                  checked={el.linesTurn === "horizontal"}
                  value={"horizontal"}
                  onChange={(e) => changeLinesTurn(el.id, e)}
                  style={{
                    position: "absolute",
                    top: `-20px`,
                    left: `80px`,
                  }}
                />
              </div>
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
        <div>
          <button>add map to shop</button>
          <button onClick={addRect}>add</button>
          <button onClick={toggleDragging}>
            {isDragable ? "disable dragging" : "enable dragging"}
          </button>
        </div>
      </div>

      <AddShopForm rect={rect} />
    </>
  );
};

export default Drawer3;
