import { actionTypes } from "./actionTypes";

export const getMainData = (data) => ({
  type: actionTypes.GET_MAIN_DATA,
  payload: data,
});

export const getShopDrawerData = (data) => ({
  type: actionTypes.GET_SHOP_DRAWER_DATA,
  payload: data,
});

export const shopSearchValue = (inputValue) => ({
  type: actionTypes.SHOP_SEARCH_VALUE,
  payload: inputValue,
});

export const findNewCities = (cities) => ({
  type: actionTypes.FIND_NEW_CITIES,
  payload: cities,
});

export const selectShop = (shop) => ({
  type: actionTypes.SELECT_SHOP,
  payload: shop,
});

export const getAllProducts = (allProducts) => ({
  type: actionTypes.GET_ALL_PRODUCTS,
  payload: allProducts,
});

export const getShop = (shop) => ({
  type: actionTypes.GET_SHOP,
  payload: shop,
});
