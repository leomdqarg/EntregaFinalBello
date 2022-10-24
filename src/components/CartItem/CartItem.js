import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const CartItem = ({id, name, img, price, quantity}) => {
    const { removeItem } = useContext(CartContext)

    const handleRemoveItem = () => {
        //const conf = confirm(`¿Seguro de eliminar el producto: ${name}?`)
        console.log('entro a remove item');
        return removeItem(id)

    }

    return (
        <div className="row">
            <div className="col-2">
                <img src={img} alt={name} className="img-thumbnail" />
            </div>
            <div className="col-4">
                <h6>{name}</h6>
                <h5>{price}</h5>
            </div>
            <div className="col-2">{quantity}</div>
            <div className="col-2"><h5>${price * quantity}</h5></div>
            <div className="col-2">
                <button className="btn btn-danger" onClick={() => handleRemoveItem()}>remove</button>
            </div>
        </div>
    )
}

export default CartItem