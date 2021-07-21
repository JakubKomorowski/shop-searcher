import { actionTypes } from "../actions/actionTypes";

// mainData = [
//   {
//     cityData: {
//       cityName: "Gdańsk",
//       cityId: 1,
//     },

//     shops: [
//       {
//         shopDetails: {
//           shopId: 1,
//           shopName: "Auchan",
//           shopSuburb: "Wrzeszcz",
//           shopStreet: "Aleja niepodległości"
//         },
//         shopProductsCategories: [
//           {
//             name: "Alkohol",
//             subCategories: [
//               {
//                 name: "Piwo",
//                 coordinates: ["50, 20", "60, 10", "55, 15"]
//                 types: [
//                   {
//                     name: "Warka",
//                    coordinates: 50, 20,
//                   },
//                     {
//                     name: "Warka Ciemne",
//                    coordinates: 60, 20,

//                   },
//                    {
//                     name: "Lech",
//                    coordinates: 55, 15,

//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// citiesNames = [
//   {
//     cityNames: ["Gdynia", "Gdańsk"],
//   },
// ];

const initialState = {
  mainData: [],
  cityInput: "",
  foundCities: [],
  seletedShop: {},
  shopDrawer: [],
  allProducts: [],
  shopData: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_MAIN_DATA:
      return {
        ...state,
        mainData: payload,
      };
    case actionTypes.SHOP_SEARCH_VALUE:
      return {
        ...state,
        cityInput: payload,
      };

    case actionTypes.FIND_NEW_CITIES:
      return {
        ...state,
        foundCities: payload,
      };

    case actionTypes.GET_SHOP_DRAWER_DATA:
      return {
        ...state,
        shopDrawer: payload,
      };

    case actionTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: [...payload],
      };

    case actionTypes.GET_SHOP:
      return {
        ...state,
        shopData: payload,
      };

    case actionTypes.SELECT_SHOP:
      return {
        ...state,
        seletedShop: payload,
      };

    default:
      return state;
  }
};

export default reducer;
