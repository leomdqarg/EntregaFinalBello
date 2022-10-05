import ItemCount from "../ItemCount/ItemCount.js"
const ItemDetail = ({item}) => {
    return (
        <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={item?.img} alt={item?.name} /></div>
            <div className="col-md-6">
                <div className="small mb-1">SKU: BST-{ item?.id }</div>
                <h1 className="display-5 fw-bolder">{ item?.name }</h1>
                <div className="fs-5 mb-5">
                    <span>${ item?.price }</span>
                </div>
                <p className="lead">{ item?.description }</p>
                <ItemCount initial={2} stock={20} />
            </div>
        </div>
    )
}

export default ItemDetail