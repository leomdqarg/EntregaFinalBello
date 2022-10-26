import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { getDocs, addDoc, collection, doc, updateDoc, where, query, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { Store } from 'react-notifications-component';
import { FormatPrice } from '../../Helpers/FormatPrice';
import ItemListContainer from '../ItemListContainer/ItemListContainer'

const Checkout = () => {
    const { cart, getTotalQuantity, getCartTotal, emptyCart } = useContext(CartContext)
    const totalQuantity = getTotalQuantity()
    const cartTotal = getCartTotal()
    const [orderId, setOrderId] = useState('')

    const createOrder = async (values) => {
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

            console.log(objOrder)

            const ids = cart.map(prod => prod.id)
            const productsRef = collection(db, 'products')

            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in' , ids)))
            const { docs } = productsAddedFromFirestore

            const batch = writeBatch(db)
            const outOfStock = [{id: '2DRgyYrQbhKJSOeLfaOz'}]
            //const outOfStock = []

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

                setOrderId(orderAdded.id)
                emptyCart()
                return new Promise(function(resolve, reject) {
                      resolve(true);
                  });
            } else {
                console.log('Hay productos fuera de stock')
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
    if (totalQuantity === 0) {
        return (<ItemListContainer showAlert={1} greetings="No hay productos en el carrito." />)
    }
    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-secondary">Mi carrito</span>
                            <span className="badge bg-secondary rounded-pill">{totalQuantity}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {
                                cart.map( item => {
                                    return (<li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                        <h6 className="my-0">{item.name}</h6>
                                        <small className="text-muted">Cantidad: {item.quantity}</small>
                                        </div>
                                        <span className="text-muted">{FormatPrice(item.price*item.quantity)}</span>
                                    </li>)

                                })
                            }
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>${cartTotal}</strong>
                            </li>
                        </ul>

                    </div>
                    { !orderId ? (<div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Mis Datos</h4>
                        <Formik
                            initialValues={{ email: '', emailRepeated: '', phone: '', firstName: '', lastName: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.emailRepeated) {
                                errors.emailRepeated = 'Required';
                                } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailRepeated)
                                ) {
                                errors.emailRepeated = 'Invalid email address';
                                }
                                if(!errors.emailRepeated && !errors.email && values.email !== values.emailRepeated) {
                                    errors.emailRepeated = 'Email and Email Repetead must be the same';
                                }
                                if (!values.firstName) {
                                    errors.firstName = 'Required'
                                }
                                if (!values.lastName) {
                                    errors.lastName = 'Required'
                                }
                                if (!values.phone) {
                                    errors.phone = 'Required'
                                } else if (
                                    !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(values.phone)
                                ) {
                                    errors.phone = 'Invalid phone number'
                                }


                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log({...values});
                                //setSubmitting(false)

                                const createOrderId = createOrder(values).then(res => {
                                    console.log('res165', res);
                                }).catch(error => {
                                    console.log('error167', error)
                                }).finally(() => {
                                    setSubmitting(false)
                                })
                                console.log('createOrderId', createOrderId)
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <Form>
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Field type="email" name="email" className={`form-control ${!errors.email ? '' : ' is-invalid' } `} placeholder="Email" />
                                                <ErrorMessage name="email" className="alert alert-danger" component="p" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="email" className="form-label">Repeat Email</label>
                                            <Field type="email" name="emailRepeated" className={`form-control ${!errors.emailRepeated ? '' : ' is-invalid' } `} placeholder="Repeat Email" />
                                            <ErrorMessage name="emailRepeated" className="alert alert-danger" component="p" />
                                        </div>
                                    </div>
                                    <div className="row g-12">
                                        <div className="col">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <Field type="text" className={`form-control ${!errors.firstName ? '' : ' is-invalid' } `} name="firstName" placeholder="First Name" />
                                            <ErrorMessage name="firstName" className="alert alert-danger" component="p" />
                                        </div>
                                    </div>
                                    <div className="row g-12">
                                        <div className="col">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <Field type="text" className={`form-control ${!errors.lastName ? '' : ' is-invalid' } `} name="lastName" placeholder="Last Name" />
                                            <ErrorMessage className="alert alert-danger" name="lastName" component="p" />
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-sm-12">
                                            <label htmlFor="email" className="form-label">Phone</label>
                                            <Field type="text" className={`form-control ${!errors.phone ? '' : ' is-invalid' } `} name="phone" placeholder="Phone Number" />
                                            <ErrorMessage className="alert alert-danger"name="phone" component="p" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <button type="submit" className="btn btn-primary float-end" disabled={isSubmitting}>Confirmar Orden</button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>) : (<div>OrderId: {orderId}</div> )
                    }
                </div>
            </div>
        </section>
    )
}

export default Checkout