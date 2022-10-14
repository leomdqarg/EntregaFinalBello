import ItemCount from "../ItemCount/ItemCount.js"
const ItemDetail = ({id, name, img, category, description, price, stock, setCart}) => {
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
                <ItemCount initial={2} stock={stock} />
            </div>
        </div>
    )
}

export default ItemDetail