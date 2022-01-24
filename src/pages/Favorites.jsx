import Card from "../Components/Card";
import React from "react";
import AppContext from "../context";

function Favorites(){
  const {favorites,onAddToFavorite } = React.useContext(AppContext);
  console.log(favorites)

    return(
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои Закладки</h1>
          
        </div>

        <div className="d-flex flex-wrap">
        {
            favorites.map((item, i) => 
            
(              <Card 
                
                key={i}
                onFavorite = {(obj) => onAddToFavorite(obj)}
                favorited={true}
                {...item}
                />) )
          }
          
        </div>
      </div>

    );
}

export default Favorites;