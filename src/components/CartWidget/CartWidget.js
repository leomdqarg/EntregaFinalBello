import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartWidget = () => {
    const { getTotalQuantity } = useContext(CartContext)
    const totalQuantity = getTotalQuantity()
    console.log('totalQuantity', totalQuantity)
    return (
                    <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{totalQuantity}</span>
                        </button>
                    </form>
    );
  }

export default CartWidget;

