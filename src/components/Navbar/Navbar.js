import { Link, NavLink } from "react-router-dom"
import logo from './logo.svg';
import CartWidget from '../CartWidget/CartWidget';

import './Navbar.css'
import React from 'react';
const NavBar = () => {
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
                                <li><NavLink className="nav-link" to="/categoria/buzos">Buzos</NavLink></li>
                                <li><NavLink className="nav-link" to="/categoria/zapatillas">Zapatillas</NavLink></li>
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

