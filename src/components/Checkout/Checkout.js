import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { getDocs, addDoc, collection, doc, updateDoc, where, query, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { Store } from 'react-notifications-component';



const Checkout = () => {
    const { cart, getTotalQuantity, getCartTotal, emptyCart } = useContext(CartContext)
    const totalQuantity = getTotalQuantity()
    const cartTotal = getCartTotal()
    const [orderId, setOrderId] = useState('')
    console.log(cart)

    const createOrder = async (values, setSubmitting) => {
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
            //const outOfStock = [{id: '2DRgyYrQbhKJSOeLfaOz'}]
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

                setOrderId(orderAdded.id)
                emptyCart()
            } else {
                console.log('Hay productos fuera de stock')
                throw new Error("Uh-oh!");
            }
        } catch (error) {

            console.log('error', error)
            Store.addNotification({
                title: "Error de Red",
                message: 'Error de red. Intente mas tarde',
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            })
            throw new Error("Uh-oh!");
        } finally {
            setSubmitting(false)
        }
    }



    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Mi carrito</span>
                            <span className="badge bg-primary rounded-pill">{totalQuantity}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {
                                cart.map( item => {
                                    return (<li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                        <h6 className="my-0">{item.name}</h6>
                                        <small className="text-muted">Cantidad: {item.quantity}</small>
                                        </div>
                                        <span className="text-muted">{item.price*item.quantity}</span>
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
                        <h4 className="mb-3">Billing address</h4>
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

                                const createOrderId = createOrder(values, setSubmitting).then(res => {
                                    console.log('res165', res);
                                }).catch(error => {
                                    console.log('error167', error)
                                }).finally(() => {
                                    setSubmitting(false)
                                })
                                console.log('createOrderId', createOrderId)
                                /* setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                }, 400);
                                */
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
                                            <label for="email" className="form-label">Email</label>
                                            <Field type="email" name="email" className={`form-control ${!errors.email ? '' : ' is-invalid' } `} placeholder="Email" />
                                                <ErrorMessage name="email" className="alert alert-danger" component="p" />
                                        </div>
                                        <div className="col-sm-6">
                                            <label for="email" className="form-label">Repeat Email</label>
                                            <Field type="email" name="emailRepeated" className={`form-control ${!errors.emailRepeated ? '' : ' is-invalid' } `} placeholder="Repeat Email" />
                                            <ErrorMessage name="emailRepeated" className="alert alert-danger" component="p" />
                                        </div>
                                    </div>
                                    <div className="row g-12">
                                        <div className="col">
                                            <label for="firstName" className="form-label">First Name</label>
                                            <Field type="text" className={`form-control ${!errors.firstName ? '' : ' is-invalid' } `} name="firstName" placeholder="First Name" />
                                            <ErrorMessage name="firstName" className="alert alert-danger" component="p" />
                                        </div>
                                    </div>
                                    <div className="row g-12">
                                        <div className="col">
                                            <label for="lastName" className="form-label">Last Name</label>
                                            <Field type="text" className={`form-control ${!errors.lastName ? '' : ' is-invalid' } `} name="lastName" placeholder="Last Name" />
                                            <ErrorMessage className="alert alert-danger" name="lastName" component="p" />
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-sm-12">
                                            <label for="email" className="form-label">Phone</label>
                                            <Field type="text" className={`form-control ${!errors.phone ? '' : ' is-invalid' } `} name="phone" placeholder="Phone Number" />
                                            <ErrorMessage className="alert alert-danger"name="phone" component="p" />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <button type="submit" className="btn btn-primary float-end" disabled={isSubmitting}>Submit</button>
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