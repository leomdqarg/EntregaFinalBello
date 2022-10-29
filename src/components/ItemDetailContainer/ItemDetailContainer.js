import { useParams } from "react-router-dom"
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loading from "../Loading/Loading"
import { getProduct } from "../../services/firebase/firestore";
import { useAsync } from "../../hooks/useAsync";
const ItemDetailContainer = () => {

    const { itemId } = useParams()
    const { data: item, loading } = useAsync(() => getProduct(itemId), [itemId])

    if (loading) {
        return ( <Loading />)
    }
    if (!item) {
        return (
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="alert alert-warning" role="alert">
                        Error. Producto no encontrado.
                    </div>
                </div>
            </section>
        )
    }

    return (<ItemDetail {...item} />)


  }

export default ItemDetailContainer;


