import { Store } from 'react-notifications-component';
import { Link, NavLink } from "react-router-dom"
import { getDocs, collection, query, where, doc } from 'firebase/firestore'
import { useState,useEffect } from "react"
import { db } from '../../services/firebase'
import logo from './logo.svg';
import CartWidget from '../CartWidget/CartWidget';

import './Navbar.css'
const NavBar = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const collectionRef = collection(db, 'categories')
        getDocs(collectionRef).then( response => {
            console.log(response)
                const categoriesAdapted = response.docs.map(doc => {
                const data = doc.data()
                return {id: doc.id, ...data}
            })
            setCategories(categoriesAdapted)
        }).catch( error => {
            console.error('error', error);
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
        })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">

                <Link className="navbar-brand" to='/'>
                    <img alt="logo" src={logo} />
                    La Tiendita
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><NavLink className="nav-link" to="/categoria/buzos">Buzos</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/categoria/zapatillas">Zapatillas</NavLink></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Comprar</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="nav-link" to="/">Todos los productos</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                {categories.map( item => {
                                    return <li key={item.id}><NavLink className="nav-link" to={`/categoria/${item.slug}`}>{item.name}</NavLink></li>
                                })}
                            </ul>
                        </li>
                    </ul>
                    <CartWidget />
                </div>
            </div>
        </nav>
    );
  }

export default NavBar;

