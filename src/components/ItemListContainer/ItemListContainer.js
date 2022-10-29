import { useParams } from 'react-router-dom'
import { getProducts } from '../../services/firebase/firestore'
import ItemCard from '../ItemCard/ItemCard'
import Loading from '../Loading/Loading'
import { useAsync } from '../../hooks/useAsync'

const ItemListContainer = ({greetings, showAlert=0}) => {

    const {categoryId} = useParams()
    const { data: items, error, loading } = useAsync(() => getProducts(categoryId), [categoryId])

    console.log(error)

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
                            <h2 className="display-4 justify-content-center">{greetings}</h2>
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


