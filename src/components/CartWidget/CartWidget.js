import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartWidget = () => {
    const { getTotalQuantity } = useCart()
    const totalQuantity = getTotalQuantity()
    return (
        <div className="d-flex">
            <Link className="btn btn-outline-dark" to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="badge bg-dark text-white ms-1 rounded-pill">{totalQuantity}</span>
            </Link>
        </div>
    );
}

export default CartWidget;

