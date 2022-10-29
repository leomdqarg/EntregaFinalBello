import { addDoc, documentId, writeBatch, doc, getDoc, getDocs, collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '.'

export const createOrder = async (values, cart, cartTotal) => {
    try {
        const objOrder = {
            buyer: {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
            },
            items: cart,
            total: cartTotal
        }
        const ids = cart.map(prod => prod.id)
        const productsRef = collection(db, 'products')

        const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in' , ids)))
        const { docs } = productsAddedFromFirestore

        const batch = writeBatch(db)

        const outOfStock = []

        docs.forEach(doc => {
            const dataDoc = doc.data()
            const stockDb = dataDoc.stock

            const productAddedToCart = cart.find(prod => prod.id === doc.id)
            const prodQuantity = productAddedToCart?.quantity

            if(stockDb >= prodQuantity) {
                batch.update(doc.ref, { stock: stockDb - prodQuantity })
            } else {
                outOfStock.push({ id: doc.id, ...dataDoc})
            }
        })

        if(outOfStock.length === 0) {
            await batch.commit()

            const orderRef = collection(db, 'orders')
            const orderAdded = await addDoc(orderRef, objOrder)

            return new Promise(function(resolve, reject) {
                  resolve(orderAdded);
              });
        } else {
            return new Promise(function(resolve, reject) {
                  reject(Error("Hay productos fuera de stock"));
              });
        }
    } catch (error) {
        return new Promise(function(resolve, reject) {
              reject(Error("Error"));
          });
    }
}

export const getProducts = (categoryId = null) => {
    return new Promise((resolve, reject) => {
        const collectionRef = categoryId ? query(collection(db, 'products'), where('category', '==', categoryId)) : collection(db, 'products')

        getDocs(collectionRef).then(response => {
            const productsAdapted = response.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data}
            })
            resolve(productsAdapted)
        }).catch( error => {
            reject(error)
        })
    })
}

export const getProduct = ((productId) => {
    return new Promise((resolve, reject) => {
        console.log('productId', productId)
        const productRef = doc(db, 'products', productId)
        getDoc(productRef).then(doc => {
            const data = doc.data()
            const productAdapted = data !== undefined ? {id: doc.id, ...data} : false
            resolve(productAdapted);
        }).catch( error => {
            reject(error)
        })
    })
})

export const getCategories = (() => {
    return new Promise((resolve,reject) => {
        const collectionRef = query(collection(db, 'categories'), orderBy('name'))
        getDocs(collectionRef).then( response => {
                const categoriesAdapted = response.docs.map(doc => {
                const data = doc.data()
                return {id: doc.id, ...data}
            })
            resolve(categoriesAdapted)
        }).catch( error => {
            reject(error)
        })
    })
})

