import { useState, createContext } from "react"
import { Store } from 'react-notifications-component';

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {
            setCart([...cart, productToAdd])
            Store.addNotification({
                title: "Producto Agregado!",
                message: `Agregado ${productToAdd.name}`,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                duration: 5000,
                onScreen: true
                }
            })
        } else {
            Store.addNotification({
                title: "Producto Actualizado!",
                message: `Actualizado ${productToAdd.name}`,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            })
            console.log('ya esta agregado')
            const cartUpdated = cart.map(prod => {
                if (prod.id === productToAdd.id) {
                    const productUpdated = {...prod, quantity: productToAdd.quantity}
                    return productUpdated
                } else {
                    return prod
                }
            })
            setCart(cartUpdated)
        }
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const productRemoved =  cart.find(prod => prod.id === id)
        const cartWithoutItem = cart.filter(prod => prod.id !== id)
        setCart(cartWithoutItem)
        Store.addNotification({
            title: "Producto eliminado!",
            message: `Quitado ${productRemoved.name}`,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        })
      }
    const getTotalQuantity = () => {
        let totalQuantity = 0
        cart.forEach(prod => {
            totalQuantity += prod.quantity
        })
        return totalQuantity
    }

    const getProductQuantity = (id) => {
        const product = cart.find(prod => prod.id === id)
        return product?.quantity
    }

    const emptyCart = () => {
        setCart([])
    }

    const getCartTotal = () => {
        let total = 0;
        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })
        return total;
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, getTotalQuantity, getProductQuantity, getCartTotal, emptyCart }}>
            {children}
        </CartContext.Provider>
    )
}