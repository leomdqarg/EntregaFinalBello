import { Store } from 'react-notifications-component';
import { useState,useEffect } from "react"
import { useParams } from 'react-router-dom'
import { getProducts } from '../../services/firebase/firestore';
import ItemCard from "../ItemCard/ItemCard"
import Loading from "../Loading/Loading"

const ItemListContainer = ({greetings, showAlert=0}) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const {categoryId} = useParams()

    useEffect(() => {
        setLoading(true)
        getProducts(categoryId).then(products => {
            setItems(products)
        }).catch(error => {
            Store.addNotification({
                title: "Error!",
                message: `Error. Intente mas tarde`,
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

    }, [categoryId])

    if (loading) {
        return (<Loading />)
    }
    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                {
                    showAlert === 1 ? (
                        <div className="alert alert-warning" role="alert">
                            {greetings}
                        </div>
                        ) : (
                        <div className="row row-cols row-cols-12 justify-content-center">
                            <h2 className="justify-content-center">{greetings}</h2>
                        </div>
                        )
                }
                {
                    items.length > 0 ? (
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            {items.map( item => (
                                <ItemCard key={item.id} {...item} />
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-warning" role="alert">
                            No hay productos para la categoria seleccionada.
                        </div>
                    )

                }
            </div>
        </section>
    );
  }

export default ItemListContainer


