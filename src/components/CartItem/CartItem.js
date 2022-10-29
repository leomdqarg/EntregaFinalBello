
import { formatPrice } from '../../helpers/formatPrice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Store } from 'react-notifications-component'
import { useCart } from '../../context/CartContext'

const CartItem = ({id, name, img, price, quantity, readOnly = false}) => {

    const { removeItem } = useCart()

    const handleRemoveItem = () => {
        console.log('readOnly', readOnly)
        const productRemoved =  removeItem(id);
        Store.addNotification({
            title: "Producto eliminado!",
            message: `Quitado ${productRemoved.name}`,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        })
        return productRemoved;
    }
    return (
        <>
            <div className="col-2">
                <img src={img} alt={name} className="img-thumbnail" />
            </div>
            <div className="col-4">
                <h6>{name}</h6>
                <h5>{formatPrice(price)}</h5>
            </div>
            <div className="col-2">{quantity}</div>
            <div className="col-2"><h5>{formatPrice(price * quantity)}</h5></div>
            <div className="col-2">
                { !readOnly ? (<button className="btn btn-danger" onClick={() => handleRemoveItem()}><FontAwesomeIcon icon={faTrash} /></button>) : ('') }
            </div>
        </>
    )
}

export default CartItem