import React from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, items=[], onRemove}) {
    const {totalPrice,cartItems,setCartItems} = useCart();
    const [isOrderComplete, setOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading,setIsLoading] = React.useState(false);

    
    const onClickOrder = async () => {
        try{
            setIsLoading(true);
            const {data} = await axios.post("https://61e99a907bc0550017bc63ca.mockapi.io/orders", {items: cartItems});
            setOrderId(data.id)
            setOrderComplete(true);
            setCartItems([]);
            
            for( let i = 0; i < cartItems.length; i++){
                const item = cartItems[i];
                await axios.delete("https://61e99a907bc0550017bc63ca.mockapi.io/cart/" + item.id);
                await delay(1000);
            }
            

            
    }catch(error){
        alert("Не удалось создать заказ")
    };
        setIsLoading(false);
    };

    return (
        <div  className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30 ">Корзина <img onClick={onClose} className="remove-btn cu-p" src="/img/btn-remove.svg" alt="remove-item"></img> </h2>
                
                {
                    items.length > 0 ? (<div className="d-flex flex-column flex">
                        <div className="items">
                    
                    {items.map((obj) => (
                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                        <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg">
                        </div>
                        <div className="mr-20 flex">
                            <p className="mb-5">{obj.title}</p>
                            <b>{obj.price} руб.</b>
                        </div>
                        <img onClick={() => onRemove(obj.id)} className="remove-btn" src="/img/btn-remove.svg" alt="remove-item"></img>
                    </div>
                    ))}

                </div>
                
                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>{totalPrice} руб.</b>
                        </li>
                        <li>
                            <span>Налог 5%</span>
                            <div></div>
                            <b>{(totalPrice / 100) * 5} руб.</b>
                        </li>
                    </ul>
                    <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить Заказ <img className="svg" src="/img/arrow.svg" alt="arrow"></img></button>
                </div>
                    </div>
                        ) : (
                            <Info 
                                title={isOrderComplete ? `Заказ №${orderId} создан.` : "Корзина пустая"} 
                                description={isOrderComplete ? "Поздравляем с покупкой.":"Добавьте хотя-бы одну пару кроссовок, что-бы сделать заказ."} 
                                image={isOrderComplete ? "/img/complete-order.jpg" :"/img/empty-cart.jpg"}></Info>
                    )
                }
                
                
                

            </div>
        </div>
    );
}

export default Drawer;