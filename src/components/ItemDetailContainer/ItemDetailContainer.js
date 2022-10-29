import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { Store } from 'react-notifications-component';
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loading from "../Loading/Loading"
import { getProduct } from "../../services/firebase/firestore";

const ItemDetailContainer = () => {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)
        getProduct(itemId).then(product => {
            setItem(product)
        }).catch(error => {
            console.error(error)
            Store.addNotification({
                title: "Error!",
                message: `Error de conexion intente mas tarde`,
                type: "error",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              })
        }).finally( () => {
            setLoading(false)
        })
    }, [itemId])

    if (loading) {
        return ( <Loading />)
    }
    if (item) {
        return (<ItemDetail {...item} />)
    }

    return (<ItemListContainer showAlert={1} greetings="Error. Producto no encontrado" />)

  }

export default ItemDetailContainer;


