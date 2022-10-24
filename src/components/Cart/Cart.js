import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import CartItem from '../CartItem/CartItem'
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import { Link } from "react-router-dom"
const Cart = () => {
    const { cart, getTotalQuantity, getCartTotal } = useContext(CartContext)
    const totalQuantity = getTotalQuantity()
    const cartTotal = getCartTotal()
    console.log(cart)
    if (totalQuantity === 0) {
        return (
            <ItemListContainer showAlert={1} greetings={`No hay productos en el carrito`} />
        )
    }
    return(
        <section className="shopping-cart spad">
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        {
                            cart.map( item => <CartItem key={item.id} {...item} />)
                        }
                    </div>
                    <div className="col-4">
                        <h4>Total del Pedido</h4>
                        <hr/>
                        <div className="row">
                            <div className="col-6">
                                <h5>Total:</h5>
                            </div>
                            <div className="col-6">
                                <h5 className="float-end">{cartTotal}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button className="btn-lg btn-danger float-start">Vaciar Carrito</button>
                            </div>
                            <div className="col-6">
                                <Link to="/checkout" className="btn-lg btn-success float-end">Enviar Orden</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart