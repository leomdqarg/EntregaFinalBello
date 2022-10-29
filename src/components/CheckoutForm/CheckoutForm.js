import { useCart } from '../../context/CartContext'
import { useOrders } from '../../context/OrdersContext'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Store } from 'react-notifications-component'
import { createOrder } from '../../services/firebase/firestore'

const CheckoutForm = ({setShowConfirmation}) => {
    const { cart, getCartTotal, emptyCart } = useCart()
    const cartTotal = getCartTotal()
    const { addOrder } = useOrders()

    return (
        <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Mis Datos</h4>
            <Formik
                initialValues={{ email: '', emailRepeated: '', phone: '', firstName: '', lastName: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Debe completar este campo';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Verifique el formato de la direccion de correo ';
                    }
                    if (!values.emailRepeated) {
                    errors.emailRepeated = 'Debe completar este campo';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailRepeated)) {
                        errors.emailRepeated = 'Verifique el formato de la direccion de correo ';
                    }
                    if(!errors.emailRepeated && !errors.email && values.email !== values.emailRepeated) {
                        errors.emailRepeated = 'Las direcciones de correo de electronico no coinciden.';
                    }
                    if (!values.firstName) {
                        errors.firstName = 'Debe completar este campo';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Debe completar este campo';
                    }
                    if (!values.phone) {
                        errors.phone = 'Debe completar este campo';
                    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(values.phone)) {
                        errors.phone = 'Formato de telefono erroneo. Debe ser solo numeros o guines y debe tener maximo 12 digitos. Ej. 123-456-12345 ó 1234567890'
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    createOrder(values, cart, cartTotal, 'generada').then(order => {
                        addOrder(order)
                        emptyCart()
                        setShowConfirmation(true)
                    }).catch(error => {
                        console.log(error)
                        Store.addNotification({
                            title: "Error de red",
                            message: 'No se pudo realizar el pedido. Intente luego',
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
                    }).finally(() => {
                        setSubmitting(false)
                    })
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
                                <label htmlFor="email" className="form-label">Correo Electronico</label>
                                <Field type="email" name="email" className={`form-control ${!errors.email ? '' : ' is-invalid' } `} placeholder="Email" />
                                    <ErrorMessage name="email" className="invalid-feedback" component="div" />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="email" className="form-label">Repita el Correo Electronico</label>
                                <Field type="email" name="emailRepeated" className={`form-control ${!errors.emailRepeated ? '' : ' is-invalid' } `} placeholder="Repeat Email" />
                                <ErrorMessage name="emailRepeated" className="invalid-feedback" component="div" />
                            </div>
                        </div>
                        <div className="row g-12">
                            <div className="col">
                                <label htmlFor="firstName" className="form-label">Nombre</label>
                                <Field type="text" className={`form-control ${!errors.firstName ? '' : ' is-invalid' } `} name="firstName" placeholder="First Name" />
                                <ErrorMessage name="firstName" className="invalid-feedback" component="div" />
                            </div>
                        </div>
                        <div className="row g-12">
                            <div className="col">
                                <label htmlFor="lastName" className="form-label">Apellido</label>
                                <Field type="text" className={`form-control ${!errors.lastName ? '' : ' is-invalid' } `} name="lastName" placeholder="Last Name" />
                                <ErrorMessage className="invalid-feedback" name="lastName" component="div" />
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-sm-12">
                                <label htmlFor="email" className="form-label">Teléfono</label>
                                <Field type="text" className={`form-control ${!errors.phone ? '' : ' is-invalid' } `} name="phone" placeholder="Phone Number" />
                                <ErrorMessage className="invalid-feedback"name="phone" component="div" />
                                <div id="phoneHelp" className="form-text">Debe ser solo numeros o guines y debe tener como maximo 12 digitos. Ej.</div>
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
        </div>
    )
}

export default CheckoutForm