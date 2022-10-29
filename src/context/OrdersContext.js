import { useState, createContext, useContext } from 'react'

const OrdersContext = createContext()

export const OrdersContextProvider = ({ children }) => {

    const [orders, setOrders] = useState([])

    const getOrders = () => {
        return orders
    }

    const addOrder = (orderToAdd) => {
            setOrders([...orders, orderToAdd])
            console.log('orders', orders);
    }

    const isInOrders = (id) => {
        return orders.some(order => order.id === id)
    }

    const removeOrder = (id) => {
        const orderRemoved =  orders.find(order => order.id === id)
        const OrdersWithoutItem = orders.filter(order => order.id !== id)
        setOrders(OrdersWithoutItem)
        return orderRemoved
    }

    const getLastOrderId = () => {
        return [...orders].pop() //avoid mutation
    }

    return (
        <OrdersContext.Provider value={{ orders, addOrder, isInOrders, removeOrder, getLastOrderId, getOrders }}>
            {children}
        </OrdersContext.Provider>
    )
}

export const useOrders = () => {
    return useContext(OrdersContext)
}
