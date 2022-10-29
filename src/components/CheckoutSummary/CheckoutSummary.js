import { formatPrice } from '../../helpers/formatPrice'
import { useCart } from '../../context/CartContext'

const CheckoutSummary = () => {
    const { cart, getTotalQuantity, getCartTotal } = useCart()
    const cartTotal = getCartTotal()
    const totalQuantity = getTotalQuantity()

    return (
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-secondary">Mi carrito</span>
                    <span className="badge bg-secondary rounded-pill">{totalQuantity}</span>
                </h4>
                <ul className="list-group mb-3">
                    {
                        cart.map( item => {
                            return (<li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                <h6 className="my-0">{item.name}</h6>
                                <small className="text-muted">Cantidad: {item.quantity}</small>
                                </div>
                                <span className="text-muted">{formatPrice(item.price*item.quantity)}</span>
                            </li>)

                        })
                    }
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total</span>
                        <strong>{formatPrice(cartTotal)}</strong>
                    </li>
                </ul>

            </div>
    )
}
export default CheckoutSummary