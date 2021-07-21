import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import {
  getAllProducts,
  getMainData,
  getShop,
  getShopDrawerData,
} from "./actions";
import { mainData, products, shopDrawer } from "./firebase/firebaseUtils";
import AddShop from "./views/AddShop";
import Cities from "./views/Cities";
import Home from "./views/Home";
import SingleCity from "./views/SingleCity";
import SingleShop from "./views/SingleShop";

const App = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.mainData);

  // useEffect(() => {
  //   const shopData = data.map((city) => city.shops.map((shop) => shop));
  //   console.log(shopData, "Shop Data");
  //   dispatch(getShop(shopData));
  // }, []);

  useEffect(() => {
    const subscribe = shopDrawer.onSnapshot((snapshot) => {
      const dataFromShopDrawer = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      dispatch(getShopDrawerData(dataFromShopDrawer));
    });
    return () => {
      subscribe();
    };
  }, []);

  useEffect(() => {
    const subscribe = mainData.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          documentId: doc.id,
        };
      });

      const shopData = data.map((city) => city.shops.map((shop) => shop));
      dispatch(getShop(shopData[0]));
      console.log(shopData[0], "Shop Data");
      console.log(data);

      dispatch(getMainData(data));
    });
    return () => {
      subscribe();
    };
  }, []);

  useEffect(() => {
    const subscribe = products.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      console.log(data[0].products, "PRODUCTS");

      dispatch(getAllProducts(data[0].products));
    });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div>
        <p>
          <Link to="/">home</Link>
        </p>
        <p>
          <Link to="/miasta">cities</Link>
        </p>
        <p>
          <Link to="/dodaj-sklep">dodaj sklep</Link>
        </p>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/miasta" component={Cities} />
        <Route path="/dodaj-sklep" component={AddShop} />
        <Route exact path="/miasto/:cityName" component={SingleCity} />
        <Route path="/miasto/:cityName/:shopName" component={SingleShop} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
