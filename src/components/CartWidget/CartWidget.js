import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
const CartWidget = () => {
    return (
                    <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form>
    );
  }

export default CartWidget;

