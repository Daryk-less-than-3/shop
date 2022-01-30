import Card from "../Components/Card";
import React from "react";
import axios from "axios";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    // const {onAddToCart,  onAddToFavorite} = useContext(AppContext);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        (async () => {
            try{
                const { data } = await axios.get("https://61e99a907bc0550017bc63ca.mockapi.io/orders");
                // setOrders(data.map((obj) => obj.items).flat());
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items],[]));
                setIsLoading(false);
            }catch(error){
                // alert("Ошибка при запросе заказа");
                console.log(error)
            }
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