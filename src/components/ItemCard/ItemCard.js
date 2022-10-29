import { Link } from 'react-router-dom'
import { formatPrice } from '../../helpers/formatPrice'
const ItemCard = ({id, name, img, price}) => {

return (
        <div className="col mb-5">
            <div className="card h-100">
                <img width="450" height="300px" className="card-img-top" src={img} alt={name} />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{name}</h5>
                        {formatPrice(price)}
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                        <Link to={`/item/${id}`} className="btn btn-outline-dark mt-auto">Ver</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard