import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"

import { getItem } from "../../asyncMock"
import ItemDetail from "../ItemDetail/ItemDetail.js"

const ItemDetailContainer = () => {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true);

    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)
        getItem(itemId).then(item => {
            setItem(item)
        }).finally(() => {
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
                <ItemDetail item={item} />
            </div>
    </section>
    );
  }

export default ItemDetailContainer;


