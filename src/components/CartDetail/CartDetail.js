import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../helpers/formatPrice'

const CartDetail = ({items = [], totalQuantity = 0, cartTotal = 0, readOnly = false}) => {
return (<section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <h4 className="mb-3 text-primary">Mi Orden</h4>
                <div className="row  text-light p-1">
                    <div className="col-6"><h5 className="text-primary">Producto</h5></div>
                    <div className="col-2"><h5 className="text-primary">Cantidad</h5></div>
                    <div className="col-2"><h5 className="text-primary">Total</h5></div>
                </div>

                <div className="row mt-3">
                    { items.map( item => <CartItem key={item.id} {...item} readOnly={readOnly} />) }
                </div>
                <div className="row bg-p-1 mt-3 bt-2">
                    <div className="col-6"><h5 className="text-primary">Totales</h5></div>
                    <div className="col-2"><h5 className="text-primary">{totalQuantity}</h5></div>
                    <div className="col-2"><h5 className="text-primary">{formatPrice(cartTotal)}</h5></div>
                </div>
                {
                    readOnly ? ('') : (
                        <div className="row mt-3">
                            <div className="col-12">
                            <Link to="/checkout" className="btn btn-success float-end">Finalizar Compra</Link>

                            </div>
                        </div>
                    )
                }
            </div>
        </section>)
}

export default CartDetail