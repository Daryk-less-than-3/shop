import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({ id,  onFavorite, title, imageUrl, price, onClickPlus, favorited = false,  loading = false }) {
    const {isItemAddedToCart} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, title, imageUrl, price};
    
    
    
    const handleClickPlus = () => {
        onClickPlus(obj);
    }
    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    
    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"

                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="99" rx="10" ry="10" width="150" height="15" />
                    <rect x="0" y="123" rx="10" ry="10" width="93" height="15" />
                    <rect x="149" y="159" rx="0" ry="0" width="1" height="0" />
                    <rect x="0" y="154" rx="9" ry="9" width="80" height="24" />
                    <rect x="118" y="154" rx="7" ry="7" width="31" height="24" />
                </ContentLoader>  :  (<>
                    {onFavorite && <div className={styles.favorite} onClick={onClickFavorite}>
                        <img src={isFavorite ? "/img/liked.svg" : "/img/unlike.svg"} alt="unliked"  ></img>
                    </div>
                    }
                    <img width={133} height={112} src={imageUrl} alt="" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб</b>
                        </div>

                        {onClickPlus && <img 
                            className={styles.plus} 
                            onClick={handleClickPlus} 
                            src={isItemAddedToCart(id) ? "/img/btn-checked.svg" : "/img/plus.svg"} 
                            width={30} height={30} alt="plus">
                        </img>}

                    </div>
                </>)
            }

        </div>
    );
}

export default Card;
