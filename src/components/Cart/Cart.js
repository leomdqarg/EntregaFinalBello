import ItemListContainer from '../ItemListContainer/ItemListContainer'
import CartDetail from '../CartDetail/CartDetail'
import { useCart } from '../../context/CartContext'

const Cart = () => {

    const { cart, getTotalQuantity, getCartTotal } = useCart()
    const totalQuantity = getTotalQuantity()
    const cartTotal = getCartTotal()

    if (totalQuantity === 0) {
        return (<ItemListContainer showAlert={1} greetings="No hay productos en el carrito." />)
    }
    return(
        <CartDetail items={cart} cartTotal={cartTotal} totalQuantity={totalQuantity} />
    )
}

export default Cart