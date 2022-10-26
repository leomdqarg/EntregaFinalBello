import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import CartItem from '../CartItem/CartItem'
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import { Link } from "react-router-dom"
import { FormatPrice } from "../../Helpers/FormatPrice"

const Cart = () => {
    const { cart, getTotalQuantity, getCartTotal } = useContext(CartContext)
    const totalQuantity = getTotalQuantity()
    const cartTotal = getCartTotal()

    if (totalQuantity === 0) {
        return (<ItemListContainer showAlert={1} greetings="No hay productos en el carrito." />)
    }
    return(
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <h4 className="mb-3 text-primary">Mi Orden</h4>
                <div className="row  text-light p-1">
                    <div className="col-6"><h5 className="text-primary">Producto</h5></div>
                    <div className="col-2"><h5 className="text-primary">Cantidad</h5></div>
                    <div className="col-2"><h5 className="text-primary">Total</h5></div>
                </div>

                <div className="row mt-3">
                    { cart.map( item => <CartItem key={item.id} {...item} />) }
                </div>
                <div className="row bg-p-1 mt-3 bt-2">
                    <div className="col-6"><h5 className="text-primary">Totales</h5></div>
                    <div className="col-2"><h5 className="text-primary">{totalQuantity}</h5></div>
                    <div className="col-2"><h5 className="text-primary">{FormatPrice(cartTotal)}</h5></div>
                </div>
                <div className="row mt-3">
                    <div class="col-12">
                    <Link to="/checkout" className="btn btn-success float-end">Finalizar Compra</Link>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart