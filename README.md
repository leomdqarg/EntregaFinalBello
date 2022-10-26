# Acerca del Proyecto

Proyecto final para el curso de [ReactJs](https://reactjs.org/). de [CoderHouse](https://www.coderhouse.es/online/reactjs)

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

## Objetivos a cumplir

- Un usuario debe poder ingresar, navegar por los productos e ir a sus detalles.
- Desde el detalle se debe poder ver la descripción, foto y precio e ingresarlo al
carrito.
- Una vez que el carrito tenga al menos un producto, se deberá visualizar un
listado compacto de la orden con el precio total.
- Al ingresar su nombre, apellido, teléfono e e-mail (ingresándolo dos veces para
corroborar que sea correcto), debe activarse el botón de ‘realizar compra’.
- Al clickear ‘realizar compra’ debe guardarse en la base de datos una orden que
tenga todos los productos, la fecha y dar feedback del número de orden.

## Prerequisitos
You’ll need to have Node >= 14 on your local development machine (but it’s not required on the server). You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

Necesitas tener [Node](https://nodejs.org/en/) version >= 14 en el entorno de desarrollo (pero no en el servidor de producci{on}). Puedes usar [nvm](https://github.com/nvm-sh/nvm#intro) (macOS/Linux) o nvm-windows para cambiar de version de Node entre diferentes proyectos.

## Librerias extras incluidas

- Fontawesome: Libreria de iconos [Fontawesome](https://fontawesome.com/v5/docs/web/use-with/react)
- Formik: para el manejo del formulario [Formik](https://formik.org/)
- Firebase/Firestore: como motor de base de datos [Firestore](https://firebase.google.com/docs/firestore)
- React Notifications: Para mostrar notificaciones y/o errores al usuario [REACT-NOTIFICATIONS](https://teodosii.github.io/react-notifications-component/)

## Instalaccion

- Para instalar dependencias: npm install
- Configuracion de Firebase/Firestore se provee un archivo de ejemplo .env.example reemplazar con los datos propios que se obtienen en [firebase/firestore](https://console.firebase.google.com/)

## En el directorio del proyecto puedes ejecutar:

## npm start

Ejecuta la aplicacion en modo desarrollo.\
Abrir [http://localhost:3000](http://localhost:3000) para ver en el navegador. \
La pagina se actualizara con cada cambio.\
Ademas se muestrar errores y output por la terminal.

## npm run build

Build de la app para el entorno de produccion. Los archivos estan la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

Ver mas en [deployment](https://facebook.github.io/create-react-app/docs/deployment) .

## Estructura de Base de Datos
Hay una coleccion de categorias con el siguiente formato: \
    categories = [\
        { name: 'Zapatos de Mujer', slug: 'woman-shoes'},\
        { name: 'Relojes de Mujer', slug: 'woman-watches'},\
        ...\
    ]

Y otra coleccion para productos \
    products = [{ \
        name: 'NIGHT SUIT', \
        description: 'NIGHT SUIT RED MICKY MOUSE..  For Girls. Fantastic Suits.', \
        price: 55, \
        discountPercentage: 15.05, \
        rating: 4.65, \
        stock: 21, \
        brand: 'RED MICKY MOUSE..', \
        category: 'womens-dresses', \
        img: 'https://dummyjson.com/image/i/products/41/thumbnail.webp', \
        images: [ \
            'https://dummyjson.com/image/i/products/41/1.jpg',\
            'https://dummyjson.com/image/i/products/41/2.webp',\
            'https://dummyjson.com/image/i/products/41/3.jpg',\
            'https://dummyjson.com/image/i/products/41/4.jpg',\
            'https://dummyjson.com/image/i/products/41/thumbnail.webp'\
        ]},\
        {\
        name: 'Stiched Kurta plus trouser',\
        description: 'FABRIC: LILEIN CHEST: 21 LENGHT: 37 TROUSER: (38) :ARABIC LILEIN',\
        price: 80,\
        discountPercentage: 15.37,\
        rating: 4.05,\
        stock: 148,\
        brand: 'Digital Printed',\
        category: 'womens-dresses',\
        img: 'https://dummyjson.com/image/i/products/42/thumbnail.jpg',\
        images: [\
            'https://dummyjson.com/image/i/products/42/1.png',\
            'https://dummyjson.com/image/i/products/42/2.png',\
            'https://dummyjson.com/image/i/products/42/3.png',\
            'https://dummyjson.com/image/i/products/42/4.jpg',\
            'https://dummyjson.com/image/i/products/42/thumbnail.jpg'\
        ]},\
        ...\
    ]\
