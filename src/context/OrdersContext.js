import { useState, createContext, useContext } from 'react'

const OrdersContext = createContext()

export const OrdersContextProvider = ({ children }) => {

    const [orders, setOrders] = useState([])


    const addOrder = (orderToAdd) => {
        if (!isInOrders(orderToAdd.id)) {
            setOrders([...orders, orderToAdd])
        }
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

    const getLastOrder = () => {
        return [...orders].pop() //avoid mutation
    }

    return (
        <OrdersContext.Provider value={{ orders, addOrder, isInOrders, removeOrder, getLastOrder }}>
            {children}
        </OrdersContext.Provider>
    )
}


export const useOrders = () => {
    return useContext(OrdersContext)
}
