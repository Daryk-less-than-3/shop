import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home"
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import Favorites from "./pages/Favorites";
import AppContext from "./context";





function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      
      const cartResponce = await axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/cart");
      const favoritesResponce = await axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/favorites");
      const itemsResponce = await axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/items");

      setCartItems(cartResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);

      setIsloading(false);
    }
    fetchData();
  }, [])



  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://61e99a907bc0550017bc63ca.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post("https://61e99a907bc0550017bc63ca.mockapi.io/cart", obj)
        setCartItems(prev => [...prev, obj]);
      }

    } catch {

    }

  };

  const onRemoveItem = (id) => {
    axios.delete(`https://61e99a907bc0550017bc63ca.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://61e99a907bc0550017bc63ca.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post("https://61e99a907bc0550017bc63ca.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch {
      console.log("не удалось добавить в 'favorite' ")
    }
  }

  const isItemAddedToCart = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
    
  };
  return (
    <AppContext.Provider value={{cartItems,favorites,items, isItemAddedToCart, onAddToFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">

        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path={"/"} exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path={"/favorites"} exact>
          <Favorites
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />
        </Route>

      </div>
    </AppContext.Provider>

  );
}

export default App;
