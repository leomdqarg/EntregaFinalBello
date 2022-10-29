import { NavLink } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'

const MyOrdersWidget = () => {
    const { getOrders } = useOrders()

    const orders = getOrders()
    if (orders.length === 0 ) {
        return '';
    }
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="myOrdersDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mis Ordenes</a>
                    <ul className="dropdown-menu" aria-labelledby="myOrdersDropdown">
                    {   orders.map( item => {
                            return <li key={item}><NavLink className="nav-link" to={`/order/${item}`}>{item}</NavLink></li>
                        })
                    }
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default MyOrdersWidget