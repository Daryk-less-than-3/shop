import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";


function Header(props) {
    const {totalPrice} = useCart();


    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to={"/"}>
            <div className="d-flex align-center">
                <img width={40} height={40} src="/img/logo.png" alt="logo" />
                <div>
                    <h3 className="text-uppercase">Shop</h3>
                    <p className="opacity-5">Магазин странных кросовок</p>
                </div>
            </div>
            </Link>
            <ul className="d-flex">
                
                    <li className="mr-30 cu-p" onClick={props.onClickCart}>
                        <img src="/img/card.svg" alt="Корзина" />
                        <span>{totalPrice} руб.</span>
                    </li>
                
                <li>
                    <Link to={"/favorites"}>
                        <img src="/img/favorite.svg" alt="favorite"></img>
                    </Link>
                    

                </li>
                <li>
                    <Link to={"/orders"} >
                        <img src="/img/user.svg" alt="user"></img>
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;