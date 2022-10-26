import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { FormatPrice } from "../../Helpers/FormatPrice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Store } from 'react-notifications-component';

const CartItem = ({id, name, img, price, quantity}) => {
    const { removeItem } = useContext(CartContext)
    const handleRemoveItem = () => {
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
                <h5>{FormatPrice(price)}</h5>
            </div>
            <div className="col-2">{quantity}</div>
            <div className="col-2"><h5>{FormatPrice(price * quantity)}</h5></div>
            <div className="col-2">
                <button className="btn btn-danger" onClick={() => handleRemoveItem()}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </>
    )
}

export default CartItem