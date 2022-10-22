import { Store } from 'react-notifications-component';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { useState,useEffect } from "react"
import { useParams } from 'react-router-dom'
import ItemCard from "../ItemCard/ItemCard"
const ItemListContainer = ({greetings, showAlert=0}) => {


    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const {categoryId} = useParams()
    console.log(categoryId);
    useEffect(() => {
        setLoading(true)

        const collectionRef = categoryId ? query(collection(db, 'products'), where('category', '==', categoryId)) : collection(db, 'products')

        getDocs(collectionRef).then(response => {
            console.log(response)

            const productsAdapted = response.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data}
            })

            setItems(productsAdapted)
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

    }, [categoryId])

    if (loading)
    {
        return (
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        <h5 className="text-dark display-4 fw-bolder">loading...</h5>
                    </div>
                </div>
            </section>
        )

    }
    else
    {
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
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {items.map( item => (
                            <ItemCard key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }
  }

export default ItemListContainer


