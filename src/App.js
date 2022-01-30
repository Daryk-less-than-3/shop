import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home"
import Header from "./Components/Header";
import Drawer from "./Components/Drawer";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";





function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      
      try {
      const [cartResponce,favoritesResponce,itemsResponce] = await Promise.all([
        axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/cart"),
        axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/favorites"),
        axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/items")
      ])
      

      setCartItems(cartResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);

      setIsloading(false);
    }catch(error){
      alert("Ошибка при запросе данных =(");
      console.error(error);
    }
    }
    fetchData();
  }, [])



  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentID) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentID) !== Number(obj.id)))
        await axios.delete(`https://61e99a907bc0550017bc63ca.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post("https://61e99a907bc0550017bc63ca.mockapi.io/cart", obj);
        setCartItems((prev) => prev.map((item) => {
          if (item.parentID === data.parentID){
            console.log(data.id)
            return {
              
              ...item, id: data.id,
            };
          }
          return item;
        }),
        );
      }

    } catch(error) {
        alert("Не получилось добавить в корзину");
        console.error(error);
    }

  };

  const onRemoveItem = async (id) => {
    try{
      await axios.delete(`https://61e99a907bc0550017bc63ca.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => item.id !== id));
    }catch(error){
      alert("Ошибка при удалении из корзины ");
      console.error(error);
  }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(`https://61e99a907bc0550017bc63ca.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post("https://61e99a907bc0550017bc63ca.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch(error) {
      console.log("не удалось добавить в 'favorite' ")
      console.error(error);
    }
  }

  const isItemAddedToCart = (id) => {
     return cartItems.some((obj) => Number(obj.parentId) === Number(id));
     
    
  };
  return (
    <AppContext.Provider value={{cartItems,favorites,items, isItemAddedToCart, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
       
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
            // onAddToFavorite={onAddToFavorite}
            // onAddToCart={onAddToCart}
          />
        </Route>
        <Route path={"/orders"} exact>
          <Orders
           
          />
        </Route>

      </div>
    </AppContext.Provider>

  );
}

export default App;
