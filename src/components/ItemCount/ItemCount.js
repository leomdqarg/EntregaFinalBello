import { useState } from 'react'
const ItemCount = ({initial = 1, stock = 0, onAdd}) => {

    const [counter, setCounter] = useState(initial)

    const incrementCounter = () => {
        if (counter < stock) {
            setCounter(counter+1)
        }
    }

    const decrementCounter = () => {
        if (counter > 0 ) {
            setCounter(counter-1)
        }
    }

    return (
        <div>
            <div className="col-auto">
                <ul className="list-inline pb-3">
                    <li className="list-inline-item text-right">
                        Cantidad:
                    </li>
                    <li className="list-inline-item"><button onClick={decrementCounter} className="btn btn-secondary" id="btn-minus">-</button></li>
                    <li className="list-inline-item"><span className="badge bg-secondary" id="var-value">{counter}</span></li>
                    <li className="list-inline-item"><button onClick={incrementCounter} className="btn btn-secondary" id="btn-plus">+</button></li>
                    <li className="list-inline-item"><span className="text-muted">({stock} disponibles)</span></li>
                </ul>
            </div>

            <div className="col-12">
                <button className="btn btn-success col-12" onClick={() => onAdd(counter)}>Agregar al carrito</button>
            </div>
        </div>
    );
}

export default ItemCount;