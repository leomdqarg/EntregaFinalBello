import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { Store } from 'react-notifications-component';

import ItemDetail from "../ItemDetail/ItemDetail.js"

const ItemDetailContainer = () => {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true);

    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)
        const productRef = doc(db, 'products', itemId)
        getDoc(productRef).then(doc => {
            console.log(doc)
            const data = doc.data()
            const productsAdapted = {id: doc.id, ...data}

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
    if (loading)
    {
        return (
            <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols justify-content-center">
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="text-center text-white">
                            <h2 className="text-dark display-4 fw-bolder">Loading</h2>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        );
    }
    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <ItemDetail {...item} />
            </div>
        </section>
    );
  }

export default ItemDetailContainer;


