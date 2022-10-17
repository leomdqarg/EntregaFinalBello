import { getItems } from "../../asyncMock";
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom'
import ItemCard from "../ItemCard/ItemCard.js";
const ItemListContainer = ({greetings}) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const {categoryId} = useParams()
    console.log(categoryId);
    useEffect(() => {
        setLoading(true)
        getItems(categoryId).then(items => {
            setItems(items)
        }).finally(() => {
                setLoading(false)
            }
        )
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
                    <div className="row row-cols row-cols-12 justify-content-center">
                        <h2 className="justify-content-center">{greetings}</h2>
                    </div>
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


