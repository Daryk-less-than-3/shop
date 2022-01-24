import Card from "../Components/Card";
import React, { useContext } from "react";
import AppContext from "../context";
import axios from "axios";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const {onAddToCart, isLoading, onAddToFavorite} = useContext(AppContext);
    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/orders");
            setOrders(data.map((obj) => obj.items).flat());
            // console.log(data.reduce((prev, obj) => [...prev, ...obj.items],[]))
        })();
    }, [])


    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои Заказы</h1>

            </div>

            <div className="d-flex flex-wrap">
                {
                    orders.map((item, i) =>

                    (
                        <Card
                            key={i}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            onClickPlus={(obj) => onAddToCart(obj)}
                            loading={isLoading}

                            {...item}
                        />
                    ))
                }

            </div>
        </div>

    );
}

export default Orders;