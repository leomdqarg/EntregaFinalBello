import { useState, useEffect } from 'react'

export const useAsync = (asyncFunc, dependencies = []) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    if (Array.isArray(dependencies)) {
        dependencies = []
    }
    useEffect(() => {
        setLoading(true)
        asyncFunc().then(response => {
            setData(response)
        }).catch(error => {
            console.error(error)
            setError(error)
        }).finally( () => {
            setLoading(false)
        })

    }, dependencies)

    return {
        data,
        error,
        loading
    }
}