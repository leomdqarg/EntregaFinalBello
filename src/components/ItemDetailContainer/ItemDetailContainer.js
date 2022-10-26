import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { Store } from 'react-notifications-component';
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loading from "../Loading/Loading"

const ItemDetailContainer = () => {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)
        const productRef = doc(db, 'products', itemId)
        getDoc(productRef).then(doc => {
            const data = doc.data()
            const productsAdapted = data !== undefined ? {id: doc.id, ...data} : false
            setItem(productsAdapted)
        }).catch( error => {
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


