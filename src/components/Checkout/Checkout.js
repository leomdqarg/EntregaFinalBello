import { useCart } from '../../context/CartContext'
import { useOrders } from '../../context/OrdersContext'

import ItemListContainer from '../ItemListContainer/ItemListContainer'
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import { useState } from 'react';

const Checkout = () => {

    const { getTotalQuantity } = useCart()
    const { getLastOrder } = useOrders()
    const totalQuantity = getTotalQuantity()
    const lastOrder = getLastOrder()
    const [showConfirmation, setShowConfirmation] = useState(false)


    if (totalQuantity === 0 && !showConfirmation) {
        return (<ItemListContainer showAlert={1} greetings="No hay productos en el carrito." />)
    }

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row g-5">
                    { !showConfirmation ? (
                        <>
                            <CheckoutSummary />
                            <CheckoutForm {...{setShowConfirmation}} />
                        </>
                        ) : (
                            <div className="alert alert-success" role="alert">Compra Finalizada. <br/>Su numero de pedido es:<strong>{lastOrder?.id}</strong></div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Checkout