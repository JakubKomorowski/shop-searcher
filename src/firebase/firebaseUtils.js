import { firestore } from "./firebaseConfig";

export const citiesNames = firestore.collection("citiesNames");
export const mainData = firestore.collection("mainData");
export const shopDrawer = firestore.collection("shopDrawer");
export const products = firestore.collection("products");

export const addMapToShop = (cityId, newShops) => {
  mainData.doc(cityId).update({
    shops: [...newShops],
  });
};
