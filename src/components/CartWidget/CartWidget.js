import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
    const { getTotalQuantity } = useContext(CartContext)
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

