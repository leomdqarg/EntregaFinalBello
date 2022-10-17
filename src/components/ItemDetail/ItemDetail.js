import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

import ItemCount from "../ItemCount/ItemCount.js"

const ItemDetail = ({id, name, img, category, description, price, stock}) => {

    const [quantityToAdd, setQuantityToAdd] = useState(0)
    const { addItem, getProductQuantity } = useContext(CartContext)

    const productAddedQuantity = getProductQuantity(id)

    const handleOnAdd = (quantity) => {
        setQuantityToAdd(quantity)

        const productToAdd = {
            id, name, price, quantity
        }

        addItem(productToAdd)
    }
    return (
        <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={img} alt={name} /></div>
            <div className="col-md-6">
                <div className="small mb-1">SKU: BST-{ id }</div>
                <h1 className="display-5 fw-bolder">{ name }</h1>
                <div className="fs-5 mb-5">
                    <span>${ price }</span>
                </div>
                <p className="lead">{ description }</p>
                {
                    quantityToAdd === 0 ? (
                        <ItemCount initial={productAddedQuantity} stock={stock} onAdd={handleOnAdd} />
                   ) : (
                    <Link to='/cart' className='btn btn-primary col-12'>Finalizar compra</Link>
                    )
                }

            </div>
        </div>
    )
}

export default ItemDetail