import { useParams } from "react-router-dom"
import { useAsync } from "../../hooks/useAsync"
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import CartDetail from "../CartDetail/CartDetail"
import { getOrder } from "../../services/firebase/firestore"
import Loading from "../Loading/Loading"
const OrderDetail = () => {

    const { orderId } = useParams()
    const { data: order, loading } = useAsync(() => getOrder(orderId), [orderId])
    console.log('order.items', order)
    console.log('order.items', orderId)
    if (loading) {
        return (<Loading />)
    }
    if (!order) {
        return (<ItemListContainer showAlert={1} greetings="No se encontro la orden solicitada." />)
    }
    return (
        <CartDetail items={order.items} cartTotal={order.total} totalQuantity={order.totalQuantity} readOnly={true} />
    )
}
export default OrderDetail